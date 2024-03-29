// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IVennDAOProducts.sol";
import "./IVennDAOVendors.sol";

// @todo: Upgradable contract
contract VennDAOProducts is Ownable, IVennDAOProducts {
    using Strings for uint256;

    Product[] public products;
    // @todo: This is temporary while we figure out Subgraph stuff
    mapping(uint256 => Product[]) public productsByVendorId;

    IVennDAOVendors private vendorsContract;

    constructor(
        IVennDAOVendors _vendorsContract,
        address _initialOwner
    ) Ownable(_initialOwner) {
        vendorsContract = _vendorsContract;
    }

    function getProductById(
        uint256 _productId
    ) external view returns (Product memory) {
        return products[_productId];
    }

    function createProduct(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _minOrderQuantity,
        uint256 _maxOrderQuantity,
        bool _active,
        uint256 _vendorTokenId,
        string[] memory _publicFields,
        string[] memory _encryptedFields
    ) external {
        uint256 productId = products.length;

        _assertVendorOwner(_vendorTokenId);

        Product memory product = Product({
            productId: productId,
            name: _name,
            description: _description,
            price: _price,
            minOrderQuantity: _minOrderQuantity,
            maxOrderQuantity: _maxOrderQuantity,
            active: _active,
            vendorTokenId: _vendorTokenId,
            publicFields: _publicFields,
            encryptedFields: _encryptedFields
        });

        products.push(product);
        productsByVendorId[_vendorTokenId].push(product);

        emit ProductCreated(
            productId,
            _active,
            _name,
            _description,
            _price,
            _minOrderQuantity,
            _maxOrderQuantity,
            _vendorTokenId,
            _publicFields,
            _encryptedFields
        );
    }

    /** Allows owner of tokenId to set the value of active */
    function setActiveStatus(uint256 _productId, bool _active) external {
        _assertVendorOwner(products[_productId].vendorTokenId);

        products[_productId].active = _active;

        emit ProductActiveStatusChanged(_productId, _active);
    }

    function getProductsByVendorId(
        uint256 _vendorTokenId
    ) external view returns (Product[] memory) {
        return productsByVendorId[_vendorTokenId];
    }

    function getEncryptionKeyByProductId(
        uint256 _productId
    ) external view returns (string memory) {
        uint256 vendorTokenId = products[_productId].vendorTokenId;
        return
            vendorsContract.getMetadataByTokenId(vendorTokenId).encryptionKey;
    }

    /** Asserts that the caller owns the given token ID */
    function _assertVendorOwner(uint256 _vendorTokenId) internal view {
        if (vendorsContract.ownerOf(_vendorTokenId) != msg.sender) {
            revert NotVendorOwner();
        }
    }
}
