// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IVennDAOProducts.sol";

enum Status {
    Pending,
    Fulfilled,
    Cancelled
}

struct Order {
    uint256 id;
    uint256 productId;
    uint256 quantity;
    address placedBy;
    address refundRecipient;
    uint256 orderTotal;
    Status status;
}

contract VennDAOOrders is Ownable {
    using Strings for uint256;

    /** Amount permillion of order subtotal to be paid to the DAO. I.e. percentage with 6 decimal places. */
    uint256 public daoFee;

    IVennDAOProducts private productsContract;

    event OrderPlaced(
        uint256 indexed orderId,
        uint256 indexed productId,
        uint256 quantity,
        address indexed buyer
    );

    constructor(
        address _initialOwner,
        address _productsContract
    ) Ownable(_initialOwner) {
        productsContract = IVennDAOProducts(_productsContract);
        daoFee = 20_000; // 2% initial fee
    }

    function placeOrder() external {
        productsContract.getProductById(0).active;
    }

    function _calculateFee(
        uint256 _orderPrice
    ) internal view returns (uint256) {
        return (_orderPrice * daoFee) / 1_000_000;
    }
}
