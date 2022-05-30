// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Proposals {
    //do proposal status, check tasks
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
    }

    mapping(string => Proposal) public proposalsMap;

    //mapping(string => mapping(address => bool))

    string[] public proposalsArray;

    //2nd parameter voter address, so we could use this in getvoter
    modifier checkVoter(string calldata id) {
        bool voterExists = false;
        for (uint256 i = 0; i < proposalsMap[id].votersFor.length; i++) {
            if (proposalsMap[id].votersFor[i].voterAddress == msg.sender) {
                voterExists = true;
                _;
                break;
            }
        }
        if (!voterExists) {
            for (
                uint256 i = 0;
                i < proposalsMap[id].votersAgainst.length;
                i++
            ) {
                if (
                    proposalsMap[id].votersAgainst[i].voterAddress == msg.sender
                ) {
                    voterExists = true;
                    _;
                    break;
                }
            }
        }
        if (!voterExists) {
            revert("Voter does not exists");
        }
    }

    modifier checkProposalOwner(string calldata objectId) {
        if (msg.sender == proposalsMap[objectId].owner) {
            _;
        } else {
            revert("You are not the proposal owner");
        }
    }

    //create modifier if the proposal already exists
    function createProposal(string calldata objectId) public {
        proposalsArray.push(objectId);
        Proposal storage _newProposal = proposalsMap[objectId];
        _newProposal.owner = msg.sender;
        _newProposal.id = objectId;
        _newProposal.votersFor.push(
            Voter({voterAddress: msg.sender, weight: 1})
        );
    }

    function getAllProposals() public view returns (string[] memory) {
        return proposalsArray;
    }

    function getProposal(string calldata objectId)
        public
        view
        returns (Proposal memory)
    {
        return proposalsMap[objectId];
    }

    function removeProposal(string calldata objectId)
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

    //check if the person is already a voter in this proposal
    function getVoter(string calldata objectId, address voterAddress)
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

    function voteFor(string calldata objectId) public checkVoter(objectId) {
        proposalsMap[objectId].votersFor.push(
            Voter({voterAddress: msg.sender, weight: 1})
        );
    }

    function voteAgainst(string calldata objectId) public checkVoter(objectId) {
        proposalsMap[objectId].votersAgainst.push(
            Voter({voterAddress: msg.sender, weight: 1})
        );
    }

    function voteForCount(string calldata objectId)
        public
        view
        returns (uint256)
    {
        return proposalsMap[objectId].votersFor.length;
    }

    function voteAgainstCount(string calldata objectId)
        public
        view
        returns (uint256)
    {
        return proposalsMap[objectId].votersFor.length;
    }
}
