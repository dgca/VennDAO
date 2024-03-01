// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IVennDAOProducts.sol";
import "./IVennDAOVendors.sol";

interface IVennDAOOrders {
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
        uint256 createdAt;
        string[] publicFields;
        string encryptedFields;
    }

    event VennDAOOrdersInitialized(
        IVennDAOProducts productsContract,
        IVennDAOVendors vendorsContract,
        address initialOwner
    );

    event OrderPlaced(
        uint256 indexed orderId,
        uint256 indexed productId,
        address indexed placedBy,
        uint256 quantity,
        address refundRecipient,
        uint256 orderTotal,
        Status status,
        uint256 createdAt,
        string[] publicFields,
        string encryptedFields
    );
    event OrderStatusUpdated(uint256 indexed orderId, Status indexed newStatus);
    event DaoFeeUpdated(uint256 newFee);
    event OrderFundsTransferred(
        uint256 indexed orderId,
        address indexed recipient,
        uint256 amount,
        uint256 daoAmount
    );
    event VendorRefundIssued(
        uint256 indexed orderId,
        address indexed vendor,
        uint256 amount
    );

    function placeOrder(
        uint256 _productId,
        uint256 _quantity,
        address _refundRecipient,
        string[] memory _publicFields,
        string memory _encryptedFields
    ) external payable;

    function updateOrderStatus(uint256 _orderId, Status _newStatus) external;

    function claimExpiredRefund(uint256 _orderId) external;

    function updateDaoFee(uint256 _newFee) external;

    function calculateOrderTotal(
        uint256 _productId,
        uint256 _quantity
    ) external view returns (uint256);
}
