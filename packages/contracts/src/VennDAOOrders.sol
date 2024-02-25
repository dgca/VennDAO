// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IVennDAOProducts.sol";
import "./IVennDAOVendors.sol";

error InvalidOrderQuantity();
error InactiveProduct();
error PaymentFailed();
error InvalidOrderStatus(string message);

enum Status {
    Pending,
    Accepted,
    Fulfilled,
    Cancelled,
    Expired
}

struct Order {
    uint256 id;
    uint256 productId;
    uint256 quantity;
    address placedBy;
    address refundRecipient;
    uint256 orderTotal;
    Status status;
    bytes encryptedOrderFields;
}

contract VennDAOOrders is Ownable {
    using Strings for uint256;

    /** Amount permillion of order subtotal to be paid to the DAO. I.e. percentage with 6 decimal places. */
    uint256 public daoFee;
    Order[] public orders;

    IVennDAOProducts private productsContract;
    IVennDAOVendors private vendorsContract;

    event OrderPlaced(
        uint256 indexed orderId,
        uint256 indexed productId,
        uint256 quantity,
        address indexed buyer
    );
    event OrderStatusUpdated(uint256 indexed orderId, Status indexed newStatus);

    constructor(
        IVennDAOProducts _productsContract,
        IVennDAOVendors _vendorsContract,
        address _initialOwner
    ) Ownable(_initialOwner) {
        productsContract = _productsContract;
        vendorsContract = _vendorsContract;
        daoFee = 20_000; // 2% initial fee
    }

    function placeOrder(
        uint256 _productId,
        uint256 _quantity,
        address _refundRecipient,
        bytes memory _encryptedOrderFields
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

        uint256 orderSubtotal = product.price * _quantity;
        uint256 daoFeeAmount = _calculateFee(orderSubtotal);
        uint256 orderTotal = orderSubtotal + daoFeeAmount;

        IERC20 usdcContract = vendorsContract.usdcContract();
        bool transferSuccess = usdcContract.transferFrom(
            msg.sender,
            address(this),
            orderTotal
        );

        if (!transferSuccess) {
            revert PaymentFailed();
        }

        // Create order
        uint256 orderId = orders.length;
        orders.push(
            Order({
                id: orderId,
                productId: _productId,
                quantity: _quantity,
                placedBy: msg.sender,
                refundRecipient: _refundRecipient,
                orderTotal: orderTotal,
                status: Status.Pending,
                encryptedOrderFields: _encryptedOrderFields
            })
        );

        emit OrderPlaced(orderId, _productId, _quantity, msg.sender);
    }

    function updateOrderStatus(uint256 _orderId, Status _newStatus) external {
        Order storage order = orders[_orderId];

        _assertVendor(
            productsContract.getProductById(order.productId).vendorTokenId
        );

        if (order.status == Status.Fulfilled) {
            revert InvalidOrderStatus("Order already fulfilled");
        }

        if (order.status == Status.Cancelled) {
            revert InvalidOrderStatus("Order already cancelled");
        }

        if (order.status == Status.Expired) {
            revert InvalidOrderStatus("Order already expired");
        }

        order.status = _newStatus;
        emit OrderStatusUpdated(_orderId, _newStatus);
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
