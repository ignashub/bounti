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

    // @dev Checks if the message sender is a task owner
    modifier isAlreadyInArray() {
        if (msg.sender == usersMap[msg.sender].contractAddress) {
            revert("This user already exists in the array");
        }
        _;
    }

    /**
     * @dev adding User to the array. msg.sender is the connected user via web3provider (wallet)
     */
    function addUser() public isAlreadyInArray {
        usersArray.push(msg.sender);
        usersMap[msg.sender].contractAddress = msg.sender;
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
    function getUser(address user) public view returns (User memory) {
        return usersMap[user];
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
