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
        Voter[] Voters;
        uint256 id;
    }

    struct Voter {
        address voterAddress;
        uint256 weight; // weight is accumulated by delegation
        bool voted; // if true, that person already voted
    }

    mapping(address => Voter) public voters;
    mapping(uint256 => Proposal) public proposalsMap;

    uint256[] public proposalsArray;
    address[] public votersFor;
    address[] public votersAgainst;

    function createProposal() public returns (bool success) {
        proposalsArray.push(proposalsArray.length + 1);
        Proposal storage _newProposal = proposalsMap[proposalsArray.length + 1];
        _newProposal.owner = msg.sender;
        _newProposal.id = proposalsArray.length + 1;
        voteFor(_newProposal.id);
        return true;
    }

    function getAllProposals() public view returns (uint256[] memory) {
        return proposalsArray;
    }

    function getProposal(uint256 id) public view returns (Proposal memory) {
        return proposalsMap[id];
    }

    function removeProposal(uint256 id) public returns (bool succes) {
        if (msg.sender == proposalsMap[id].owner) {
            delete proposalsMap[id];
            for (uint256 i = 0; i < proposalsArray.length; i++) {
                if (proposalsArray[i] == id) {
                    delete proposalsArray[i];
                    return true;
                }
            }
        }
        return false;
    }

    function checkVoter(uint256 id, address voter)
        public
        view
        returns (bool success)
    {
        for (uint256 i = 0; i < proposalsMap[id].Voters.length; i++) {
            if (proposalsMap[id].Voters[i].voterAddress == voter) {
                return true;
            } else {
                return false;
            }
        }
    }

    function getVoter(uint256 id, address voterAddress)
        public
        view
        returns (Voter memory voter)
    {
        for (uint256 i = 0; i < proposalsMap[id].Voters.length; i++) {
            if (proposalsMap[id].Voters[i].voterAddress == voterAddress) {
                return voter;
            }
        }
    }

    function voteFor(uint256 proposal) public returns (bool success) {
        if (checkVoter(proposal, msg.sender) == false) {
            proposalsMap[proposal].Voters.push(
                Voter({voterAddress: msg.sender, voted: true, weight: 1})
            );
            votersFor.push(msg.sender);
            return true;
        } else {
            return false;
        }
    }

    function voteAgains(uint256 proposal) public returns (bool success) {
        if (checkVoter(proposal, msg.sender) == false) {
            proposalsMap[proposal].Voters.push(
                Voter({voterAddress: msg.sender, voted: true, weight: 1})
            );
            votersAgainst.push(msg.sender);
            return true;
        } else {
            return false;
        }
    }
}
