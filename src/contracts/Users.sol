// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * @title User
 * @dev Store DAOs and User values in order to save in blockchain.
 */
contract UserContract {
    struct User {
        address contractAddress;
    }

    address[] usersArray;
    mapping(address => User) usersMap;

    /**
     * @dev adding User to the array. msg.sender is the connected user via web3provider (wallet)
     */
    function addUser() public {
        usersArray.push(msg.sender);
    }

    /**
     * @dev Gets an array of Users
     * This only gets array of User addresses
     */
    function getAllUsers() public view returns (address[] memory) {
        return usersArray;
    }

    /**
     * @dev Get user from provided contract address
     */
    function getUser(address dao) public view returns (User memory) {
        return usersMap[dao];
    }

    /**
     * @dev Removes User both from Array and Map
     */
    function removeUser(address user) public {
        for (uint256 i = 0; i < usersArray.length; i++) {
            if (usersArray[i] == user) {
                delete usersArray[i];
            }
        }
        delete usersMap[user];
    }
}
