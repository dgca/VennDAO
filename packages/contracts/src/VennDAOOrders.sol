// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IVennDAOProducts.sol";
import "./IVennDAOVendors.sol";
import "./IVennDAOOrders.sol";

error InvalidOrderQuantity();
error InactiveProduct();
error PaymentFailed();
error InvalidOrderStatus(string message);

contract VennDAOOrders is IVennDAOOrders, Ownable {
    using Strings for uint256;

    /** Amount permillion of order subtotal to be paid to the DAO. I.e. percentage with 6 decimal places. */
    uint256 public daoFee;
    Order[] public orders;
    uint256 public orderAcceptanceWindow = 1 weeks;

    IVennDAOProducts private productsContract;
    IVennDAOVendors private vendorsContract;
    bool private locked;

    modifier noReentrancy() {
        require(!locked, "No reentrancy allowed!");
        locked = true;
        _;
        locked = false;
    }

    constructor(
        IVennDAOProducts _productsContract,
        IVennDAOVendors _vendorsContract,
        address _initialOwner
    ) Ownable(_initialOwner) {
        productsContract = _productsContract;
        vendorsContract = _vendorsContract;
        daoFee = 20_000; // 2% initial fee
        emit VennDAOOrdersInitialized(
            _productsContract,
            _vendorsContract,
            _initialOwner
        );
    }

    function calculateOrderTotal(
        uint256 _productId,
        uint256 _quantity
    ) external view returns (uint256) {
        IVennDAOProducts.Product memory product = productsContract
            .getProductById(_productId);
        uint256 orderSubtotal = product.price * _quantity;
        uint256 daoFeeAmount = _calculateFee(orderSubtotal);
        return orderSubtotal + daoFeeAmount;
    }

    function placeOrder(
        uint256 _productId,
        uint256 _quantity,
        address _refundRecipient,
        string[] memory _publicFields,
        string memory _encryptedFields
    ) external payable {
        // Get product details
        IVennDAOProducts.Product memory product = productsContract
            .getProductById(_productId);

        if (product.active == false) {
            revert InactiveProduct();
        }

        if (
            _quantity == 0 ||
            product.minOrderQuantity > _quantity ||
            product.maxOrderQuantity < _quantity
        ) {
            revert InvalidOrderQuantity();
        }

        uint256 daoFeeAmount = _calculateFee(product.price * _quantity);
        uint256 orderTotal = product.price * _quantity + daoFeeAmount;

        bool transferSuccess = vendorsContract.usdcContract().transferFrom(
            msg.sender,
            address(this),
            orderTotal
        );

        if (!transferSuccess) {
            revert PaymentFailed();
        }

        emit OrderPlaced(
            orders.length,
            _productId,
            msg.sender,
            _quantity,
            _refundRecipient,
            orderTotal - daoFeeAmount,
            daoFeeAmount,
            Status.Pending,
            _publicFields,
            _encryptedFields
        );

        // Create order
        orders.push(
            Order({
                orderId: orders.length,
                productId: _productId,
                quantity: _quantity,
                placedBy: msg.sender,
                refundRecipient: _refundRecipient,
                orderTotal: orderTotal,
                status: Status.Pending,
                createdAt: block.timestamp,
                publicFields: _publicFields,
                encryptedFields: _encryptedFields
            })
        );
    }

    function updateOrderStatus(
        uint256 _orderId,
        Status _newStatus
    ) external noReentrancy {
        Order storage order = orders[_orderId];

        _assertVendor(
            productsContract.getProductById(order.productId).vendorTokenId
        );

        if (_newStatus == Status.Expired) {
            revert InvalidOrderStatus("Cannot set status to Expired");
        }

        if (order.status != Status.Pending && order.status != Status.Accepted) {
            revert InvalidOrderStatus("Order already reached terminal state");
        }

        uint256 daoAmount = order.orderTotal -
            (order.quantity *
                productsContract.getProductById(order.productId).price);
        uint256 vendorAmount = order.orderTotal - daoAmount;

        // If the order is pending and moving to accepted or fulfilled,
        // we transfer funds to vendor and treasury
        if (order.status == Status.Pending && _newStatus != Status.Cancelled) {
            IERC20 usdcContract = vendorsContract.usdcContract();
            usdcContract.transfer(msg.sender, vendorAmount);
            usdcContract.transfer(vendorsContract.treasuryAddress(), daoAmount);

            vendorsContract.increaseVendorRevenue(
                productsContract.getProductById(order.productId).vendorTokenId,
                vendorAmount
            );

            emit OrderFundsTransferred(
                _orderId,
                msg.sender,
                vendorAmount,
                daoAmount
            );
        }

        // If the order is being cancelled, and the order is pending, we refund the buyer from escrow
        if (order.status == Status.Pending && _newStatus == Status.Cancelled) {
            IERC20 usdcContract = vendorsContract.usdcContract();
            usdcContract.transfer(order.refundRecipient, order.orderTotal);
        }

        // If the order is being cancelled, and the order is accepted, the vendor must refund the buyer the order total
        if (order.status == Status.Accepted && _newStatus == Status.Cancelled) {
            IERC20 usdcContract = vendorsContract.usdcContract();
            usdcContract.transferFrom(
                msg.sender,
                order.refundRecipient,
                order.orderTotal
            );
            vendorsContract.decreaseVendorRevenue(
                productsContract.getProductById(order.productId).vendorTokenId,
                vendorAmount
            );
            emit VendorRefundIssued(_orderId, msg.sender, vendorAmount);
        }

        order.status = _newStatus;

        emit OrderStatusUpdated(_orderId, _newStatus);
    }

    function claimExpiredRefund(uint256 _orderId) external noReentrancy {
        Order storage order = orders[_orderId];

        if (order.status != Status.Pending) {
            revert InvalidOrderStatus("Order not in a refundable state");
        }

        if (block.timestamp < order.createdAt + orderAcceptanceWindow) {
            revert InvalidOrderStatus("Order not yet refundable");
        }

        if (msg.sender != order.refundRecipient) {
            revert InvalidOrderStatus("Not the refund recipient");
        }

        order.status = Status.Expired;

        vendorsContract.usdcContract().transfer(
            order.refundRecipient,
            order.orderTotal
        );

        emit OrderStatusUpdated(_orderId, Status.Expired);
    }

    function updateDaoFee(uint256 _newFee) external onlyOwner {
        daoFee = _newFee;
        emit DaoFeeUpdated(_newFee);
    }

    function getOrders() external view returns (Order[] memory) {
        return orders;
    }

    function _assertVendor(uint256 _vendorTokenId) internal view {
        if (vendorsContract.ownerOf(_vendorTokenId) != msg.sender) {
            revert NotVendorOwner();
        }
    }

    function _calculateFee(
        uint256 _orderPrice
    ) internal view returns (uint256) {
        return (_orderPrice * daoFee) / 1_000_000;
    }
}
