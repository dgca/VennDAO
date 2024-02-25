// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

struct VendorMetadata {
    string name;
    string description;
    string website;
    uint128 revenue;
}

interface IVennDAOVendors is IERC721 {
    function membershipFee() external view returns (uint256);

    function usdcContract() external view returns (IERC20);
}
