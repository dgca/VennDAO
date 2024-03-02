// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./IVennDAOVendors.sol";

error OnlyOrdersContract();

contract VennDAOVendors is
    IVennDAOVendors,
    ERC721,
    ERC721Enumerable,
    EIP712,
    ERC721Votes,
    Ownable
{
    using Strings for uint256;

    uint256 public membershipFee;
    IERC20 public usdcContract;
    address public treasuryAddress;
    address public ordersAddress;

    uint256 private nextTokenId;
    mapping(uint256 => VendorMetadata) private metadataByTokenId;

    constructor(
        address _initialOwner,
        IERC20 _usdcContract,
        address _treasuryAddress
    ) ERC721("VennDAO", "VNDAO") Ownable(_initialOwner) EIP712("VennDAO", "1") {
        membershipFee = 50 * 10 ** 6; // 50 USDC
        usdcContract = _usdcContract;
        treasuryAddress = _treasuryAddress;
    }

    /**
     * Allows members to join by creating a vendor NFT
     * @param _name Vendor name
     * @param _description Vendor description
     * @param _website URL to vendor's website
     */
    function joinDAO(
        string memory _name,
        string memory _description,
        string memory _website,
        string memory _encryptionKey
    ) public {
        uint256 tokenId = nextTokenId++;

        usdcContract.transferFrom(msg.sender, treasuryAddress, membershipFee);

        bool isNewMember = balanceOf(msg.sender) == 0;

        _safeMint(msg.sender, tokenId);

        VendorMetadata memory metadata = VendorMetadata({
            name: _name,
            description: _description,
            website: _website,
            encryptionKey: _encryptionKey,
            revenue: 0
        });

        metadataByTokenId[tokenId] = metadata;

        if (isNewMember && delegates(msg.sender) == address(0)) {
            delegate(msg.sender);
        }

        emit NewVendorMember(
            tokenId,
            msg.sender,
            _name,
            _description,
            _website
        );
    }

    function updateMembershipFee(uint256 _newFee) public onlyOwner {
        membershipFee = _newFee;
        emit MembershipFeeUpdated(_newFee);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return
            _buildMetadata(
                metadataByTokenId[tokenId].name,
                metadataByTokenId[tokenId].description,
                metadataByTokenId[tokenId].website,
                metadataByTokenId[tokenId].encryptionKey
            );
    }

    function increaseVendorRevenue(uint256 _tokenId, uint256 _amount) public {
        _assertOrdersContract();
        metadataByTokenId[_tokenId].revenue += _amount;
    }

    function decreaseVendorRevenue(uint256 _tokenId, uint256 _amount) public {
        _assertOrdersContract();
        metadataByTokenId[_tokenId].revenue -= _amount;
    }

    function setOrdersAddress(address _ordersAddress) public onlyOwner {
        ordersAddress = _ordersAddress;
        emit OrdersAddressUpdated(_ordersAddress);
    }

    function getAllTokensByOwner(
        address _owner
    ) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);

        for (uint256 i = 0; i < ownerTokenCount; i++) {
            ownedTokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return ownedTokenIds;
    }

    function getMetadataByTokenId(
        uint256 _tokenId
    ) public view returns (VendorMetadata memory) {
        return metadataByTokenId[_tokenId];
    }

    function _assertOrdersContract() internal view {
        if (msg.sender != ordersAddress) {
            revert OnlyOrdersContract();
        }
    }

    /**
     * Allows governance to burn a vendor token
     * @param tokenId Token ID to burn
     */
    function burn(uint256 tokenId) public onlyOwner {
        _update(address(0), tokenId, _msgSender());
        emit TokenBurned(tokenId);
    }

    function _buildMetadata(
        string memory _name,
        string memory _description,
        string memory _website,
        string memory _encryptionKey
    ) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        abi.encodePacked(
                            "{",
                            '"name": "',
                            _name,
                            '",',
                            '"description": "',
                            _description,
                            '",',
                            '"website": "',
                            _website,
                            '",',
                            '"encryptionKey": "',
                            _encryptionKey,
                            '"',
                            "}"
                        )
                    )
                )
            );
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override(ERC721, ERC721Enumerable, ERC721Votes)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable, ERC721Votes) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable, IERC165) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
