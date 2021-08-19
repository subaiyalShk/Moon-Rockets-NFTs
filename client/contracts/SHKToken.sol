//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SHKToken is ERC20 {
    constructor() ERC20("Subaiyal Sheikh Token", "SHK"){
        _mint(msg.sender, 100000 * (10**18));
    }
}