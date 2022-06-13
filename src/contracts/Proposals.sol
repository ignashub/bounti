// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Proposals {
    struct Proposal {
        address daoContractAddress;
        address owner;
        string id;
        Voter[] votersFor;
        Voter[] votersAgainst;
    }

    struct Voter {
        address voterAddress;
        uint256 weight; // weight is accumulated by delegation
        bool voted; // if true, that person already voted
    }

    mapping(string => Proposal) public proposalsMap;

    string[] public proposalsArray;

    modifier checkVoter(string memory id) {
        for (uint256 i = 0; i < proposalsMap[id].votersFor.length; i++) {
            if (proposalsMap[id].votersFor[i].voterAddress != msg.sender) {
                for (
                    uint256 j = 0;
                    j < proposalsMap[id].votersAgainst.length;
                    j++
                ) {
                    if (
                        proposalsMap[id].votersFor[j].voterAddress != msg.sender
                    ) {
                        _;
                    } else {
                        revert("You have already voted");
                    }
                }
            } else {
                revert("You have already voted");
            }
        }
    }

    modifier checkProposalOwner(string memory objectId) {
        if (msg.sender == proposalsMap[objectId].owner) {
            _;
        } else {
            revert("You are not the proposal owner");
        }
    }

    function createProposal(string memory objectId)
        public
        returns (bool success)
    {
        proposalsArray.push(objectId);
        Proposal storage _newProposal = proposalsMap[objectId];
        _newProposal.owner = msg.sender;
        _newProposal.id = objectId;
        _newProposal.votersFor.push(
            Voter({voterAddress: msg.sender, voted: true, weight: 1})
        );
        voteFor(_newProposal.id);
        return true;
    }

    function getAllProposals() public view returns (string[] memory) {
        return proposalsArray;
    }

    function getProposal(string memory objectId)
        public
        view
        returns (Proposal memory)
    {
        return proposalsMap[objectId];
    }

    function removeProposal(string memory objectId)
        public
        checkProposalOwner(objectId)
    {
        delete proposalsMap[objectId];
        for (uint256 i = 0; i < proposalsArray.length; i++) {
            if (proposalsArray[i] == objectId) {
                delete proposalsArray[i];
            }
        }
    }

    function getVoter(string memory objectId, address voterAddress)
        public
        view
        returns (Voter memory voter)
    {
        for (uint256 i = 0; i < proposalsMap[objectId].votersFor.length; i++) {
            if (
                proposalsMap[objectId].votersFor[i].voterAddress == voterAddress
            ) {
                for (
                    uint256 j = 0;
                    j < proposalsMap[objectId].votersAgainst.length;
                    j++
                ) {
                    if (
                        proposalsMap[objectId].votersAgainst[j].voterAddress ==
                        voterAddress
                    ) {
                        return voter;
                    }
                }
            }
        }
    }

    function voteFor(string memory objectId) public checkVoter(objectId) {
        proposalsMap[objectId].votersFor.push(
            Voter({voterAddress: msg.sender, voted: true, weight: 1})
        );
    }

    function voteAgainst(string memory objectId) public checkVoter(objectId) {
        proposalsMap[objectId].votersAgainst.push(
            Voter({voterAddress: msg.sender, voted: true, weight: 1})
        );
    }

    function voteForCount(string memory objectId)
        public
        view
        returns (uint256)
    {
        return proposalsMap[objectId].votersFor.length;
    }

    function voteAgainstCount(string memory objectId)
        public
        view
        returns (uint256)
    {
        return proposalsMap[objectId].votersFor.length;
    }
}
