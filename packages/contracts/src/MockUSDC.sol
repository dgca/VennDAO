// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("MockUSDC", "MockUSDC") {}

    function mint() public {
        _mint(msg.sender, 500 * 10 ** 6);
    }

    function decimals() public pure virtual override returns (uint8) {
        return 6;
    }
}
