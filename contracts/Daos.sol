// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

contract Daos {
    struct Dao {
        //Every DAO has address & list of members
        address contractAddress;
        address[] membersArray; //To index
        //Taken away to allow getAllDaos
        //mapping(address => address) membersMapping; //Used mapping to be able ot search for users by address
    }

    //Bounti has a list of DAOs
    address[] daosArray; //To get all DAO contract address
    mapping(address => Dao) daosMap; //to search by DAO and get members

    /**
     * @dev Adding DAO to bounti and also adds msg.sender to dao automatically
     */
    function addDao(address dao) public returns (bool success) {
        dao = daosArray.push();
        Dao storage _newDao = daosMap[dao];
        _newDao.contractAddress = dao;
        daosMap[dao].membersArray.push(msg.sender); //adds user that added dao to said dao
        return true;
    }

    /**
     * @dev Gets an array of DAOs
     * This only gets array of DAO contracts unable to get members per dao
     */
    function getAllDaos() public view returns (address[] memory) {
        return daosArray;
    }

    /**
     * @dev Get dao from provided contract address
     * gets DAO contract and most recent version of membersArray
     */
    function getDao(address dao) public view returns (Dao memory) {
        return daosMap[dao];
    }

    /**
     * @dev Removes DAO both from Array and Map
     */
    function removeDao(address dao) public returns (bool succes) {
        for (uint256 i = 0; i < daosArray.length; i++) {
            if (daosArray[i] == dao) {
                delete daosArray[i];
            }
        }
        delete daosMap[dao];
        return true;
    }

    /**
     * @dev Check if member exists in DAO
     */
    function checkMember(address dao, address member)
        public
        view
        returns (bool success)
    {
        for (uint256 i = 0; i < daosMap[dao].membersArray.length; i++) {
            if (daosMap[dao].membersArray[i] == member) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * @dev User joins DAO from given contract
     * Only updates members list within daoMap
     */
    function joinDao(address dao) public returns (bool success) {
        daosMap[dao].membersArray.push(msg.sender);
        return true;
    }

    /**
     * @dev Get all members from a certain DAO
     */
    function getAllMembers(address dao) public view returns (address[] memory) {
        return daosMap[dao].membersArray;
    }

    /**
     * @dev Get members number from a certain DAO
     */
    function getMembersNumber(address dao) external view returns (uint256) {
        return daosMap[dao].membersArray.length;
    }

    /**
     * @dev Remove member from DAO
     */
    function removeMember(address dao, address member)
        public
        returns (bool success)
    {
        for (uint256 i = 0; i < daosMap[dao].membersArray.length; i++) {
            if (daosMap[dao].membersArray[i] == member) {
                delete daosMap[dao].membersArray[i];
                return true;
            }
            return false;
        }
    }
}
