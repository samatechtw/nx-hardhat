// SPDX-License-Identifier: MIT
pragma solidity ~0.8.0;

import "./library/Ownable.sol";
import "./library/ERC20.sol";

/// @title Custom Token
/// @author Custom Author
/// @notice Custom ERC20 token
contract CustomToken is Ownable, ERC20 {

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address owner
    ) ERC20(name, symbol) {
        _mint(owner, initialSupply);
    }

    /// @notice Creates `amount` new tokens for `to`.
    /// @dev See {ERC20-_mint}.
    /// @param to The address that will receive tokens
    /// @param amount The number of tokens to mint
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

}
