// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IVennDAOOrders.sol";

contract DemoProject is ERC721, Ownable {
    uint256 private _nextTokenId;
    IVennDAOOrders private vennDAO;
    IERC20 private usdcContract;

    constructor(
        address _initialOwner,
        IVennDAOOrders _vennDAOAddress,
        IERC20 _usdcContract
    ) ERC721("BasedHams", "HAMS") Ownable(_initialOwner) {
        vennDAO = _vennDAOAddress;
        usdcContract = _usdcContract;
    }

    function mint(
        uint256 productId,
        string memory encryptedFields
    ) public payable {
        if (msg.value != 0.01 ether) {
            revert("Must send 0.01 ETH to mint");
        }

        uint256 quantity = 1;
        string[] memory publicFields = new string[](1);
        publicFields[0] = "https://i.imgur.com/u8WH6wZ.png";

        usdcContract.approve(
            address(vennDAO),
            vennDAO.calculateOrderTotal(productId, quantity)
        );

        uint256 tokenId = _nextTokenId++;

        vennDAO.placeOrder(
            productId,
            quantity,
            msg.sender,
            publicFields,
            encryptedFields
        );

        _safeMint(msg.sender, tokenId);
    }
}
