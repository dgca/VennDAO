// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IVennDAOProducts {
    struct Product {
        uint256 id;
        bool active;
        string name;
        string description;
        uint256 price;
        uint256 minOrderQuantity;
        uint256 maxOrderQuantity;
        uint256 vendorTokenId;
        string[] encryptedOrderFields;
    }

    event ProductCreated(
        uint256 indexed id,
        bool active,
        string name,
        string description,
        uint256 price,
        uint256 minOrderQuantity,
        uint256 maxOrderQuantity,
        uint256 vendorTokenId,
        string[] encryptedOrderFields
    );

    event ProductActiveStatusChanged(uint256 indexed id, bool active);

    function getProductById(
        uint256 _productId
    ) external view returns (Product memory);

    function createProduct(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _minOrderQuantity,
        uint256 _maxOrderQuantity,
        bool _active,
        uint256 _vendorTokenId,
        string[] memory _encryptedOrderFields
    ) external;

    function setActiveStatus(uint256 _productId, bool _active) external;
}
