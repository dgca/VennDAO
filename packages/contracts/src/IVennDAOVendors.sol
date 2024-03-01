// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

struct VendorMetadata {
    string name;
    string description;
    string website;
    string encryptionKey;
    uint256 revenue;
}

interface IVennDAOVendors is IERC721 {
    event NewVendorMember(
        uint256 indexed tokenId,
        address indexed member,
        string name,
        string description,
        string website
    );

    event MembershipFeeUpdated(uint256 newFee);

    event OrdersAddressUpdated(address newOrdersAddress);

    event TokenBurned(uint256 tokenId);

    function membershipFee() external view returns (uint256);

    function usdcContract() external view returns (IERC20);

    function treasuryAddress() external view returns (address);

    function increaseVendorRevenue(uint256 _tokenId, uint256 _amount) external;

    function decreaseVendorRevenue(uint256 _tokenId, uint256 _amount) external;
}
