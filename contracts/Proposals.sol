//// SPDX-License-Identifier: GPL-3.0
//
//pragma solidity ^0.8.0;
//
///**
// * @title Storage
// * @dev Store & retrieve value in a variable
// * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
// */
//
//import "./Daos.sol";
//
//contract Proposals {
//    Daos public d;
//
//    enum ProposalStatus {
//        IN_PROCESS,
//        COMPLETED
//    }
//
//    struct Proposal {
//        address daoContractAddress;
//        address owner;
//        string id;
//        Voter[] votersFor;
//        Voter[] votersAgainst;
//        bool initialized;
//        ProposalStatus status;
//        uint256 completeThreshold;
//    }
//
//    struct Voter {
//        address voterAddress;
//        uint256 weight; // weight is accumulated by delegation
//    }
//
//    mapping(string => Proposal) public proposalsMap;
//
//    string[] public proposalsArray;
//
//    //checks if the Voter already exists in the particular Proposal
//    modifier checkVoterExists(string calldata id, address voterAddress) {
//        bool voterExists = false;
//        for (uint256 i = 0; i < proposalsMap[id].votersFor.length; i++) {
//            if (proposalsMap[id].votersFor[i].voterAddress == voterAddress) {
//                voterExists = true;
//                _;
//                break;
//            }
//        }
//        if (!voterExists) {
//            for (
//                uint256 i = 0;
//                i < proposalsMap[id].votersAgainst.length;
//                i++
//            ) {
//                if (
//                    proposalsMap[id].votersAgainst[i].voterAddress ==
//                    voterAddress
//                ) {
//                    voterExists = true;
//                    _;
//                    break;
//                }
//            }
//        }
//        if (!voterExists) {
//            revert("Voter does not exists");
//        }
//    }
//
//    //checks if the Voter already voted in the particular Proposal
//    modifier checkVoterVoted(string calldata id, address voterAddress) {
//        for (uint256 i = 0; i < proposalsMap[id].votersFor.length; i++) {
//            if (proposalsMap[id].votersFor[i].voterAddress == voterAddress) {
//                revert("Voter already voted");
//            }
//        }
//        for (uint256 i = 0; i < proposalsMap[id].votersAgainst.length; i++) {
//            if (
//                proposalsMap[id].votersAgainst[i].voterAddress == voterAddress
//            ) {
//                revert("Voter already voted");
//            }
//        }
//        _;
//    }
//
//    //checks if msg.sender is proposal owner
//    modifier checkProposalOwner(string calldata objectId) {
//        if (msg.sender == proposalsMap[objectId].owner) {
//            _;
//        } else {
//            revert("You are not the proposal owner");
//        }
//    }
//
//    //checks if proposal exists
//    modifier checkProposalExists(string calldata objectId) {
//        require(
//            proposalsMap[objectId].initialized,
//            "The proposal does not exists"
//        );
//        _;
//    }
//
//    //checks if proposal doesnt exists
//    modifier proposalDoesntExists(string calldata objectId) {
//        require(
//            !proposalsMap[objectId].initialized,
//            "The proposal already exists"
//        );
//        _;
//    }
//
//    //checks if proposal exists
//    modifier emptyProposal(string calldata objectId) {
//        if (compareStrings(objectId, "")) {
//            revert("You have not entered proposal Id");
//        } else {
//            _;
//        }
//    }
//
//    modifier checkProposalStatus(
//        string calldata objectId,
//        ProposalStatus status
//    ) {
//        require(
//            proposalsMap[objectId].status == status,
//            "You can't do this action at current Proposal stage"
//        );
//        _;
//    }
//
//    function createProposal(string calldata objectId, uint256 completeThreshold)
//        public
//        proposalDoesntExists(objectId)
//        emptyProposal(objectId)
//    {
//        proposalsArray.push(objectId);
//        Proposal storage _newProposal = proposalsMap[objectId];
//        _newProposal.owner = msg.sender;
//        _newProposal.id = objectId;
//        _newProposal.initialized = true;
//        _newProposal.status = ProposalStatus.IN_PROCESS;
//        _newProposal.completeThreshold = completeThreshold;
//        _newProposal.votersFor.push(
//            Voter({voterAddress: msg.sender, weight: 1})
//        );
//    }
//
//    //completes proposal
//    //compare if votersFor is bigger than the treshold.
//    // votersFor / Daos.getMembersNumber >= threshold
//    function completeProposal(string calldata objectId)
//        public
//        proposalDoesntExists(objectId)
//        emptyProposal(objectId)
//        checkProposalStatus(objectId, ProposalStatus.IN_PROCESS)
//    {
//        uint256 votersForNumber = votersForCount(objectId);
////        uint256 membersNumber = Daos.getMembersNumber();
//        uint256 votersForAmount = membersNumber / votersForNumber;
//        if (votersForAmount >= proposalsMap[objectId].completeThreshold) {
//            proposalsMap[objectId].status = ProposalStatus.COMPLETED;
//        }
//    }
//
//    function getAllProposals() public view returns (string[] memory) {
//        return proposalsArray;
//    }
//
//    function getProposal(string calldata objectId)
//        public
//        view
//        checkProposalExists(objectId)
//        returns (Proposal memory)
//    {
//        return proposalsMap[objectId];
//    }
//
//    //contract
//    function completeProposal(
//        address _contract,
//        string calldata objectId,
//        address dao
//    )
//        public
//        checkProposalExists(objectId)
//        checkProposalOwner(objectId)
//        checkProposalStatus(objectId, ProposalStatus.COMPLETED)
//    {
////        uint256 allMembers = _contract.getMembersNumber(dao);
//        proposalsMap[objectId].status = ProposalStatus.COMPLETED;
//    }
//
//    function removeProposal(string calldata objectId)
//        public
//        checkProposalExists(objectId)
//        checkProposalOwner(objectId)
//    {
//        delete proposalsMap[objectId];
//        for (uint256 i = 0; i < proposalsArray.length; i++) {
//            if (compareStrings(proposalsArray[i], objectId)) {
//                delete proposalsArray[i];
//            }
//        }
//    }
//
//    function getVoter(string calldata objectId, address voterAddress)
//        public
//        view
//        checkVoterExists(objectId, voterAddress)
//        returns (Voter memory voter)
//    {
//        for (uint256 i = 0; i < proposalsMap[objectId].votersFor.length; i++) {
//            if (
//                proposalsMap[objectId].votersFor[i].voterAddress == voterAddress
//            ) {
//                for (
//                    uint256 j = 0;
//                    j < proposalsMap[objectId].votersAgainst.length;
//                    j++
//                ) {
//                    if (
//                        proposalsMap[objectId].votersAgainst[j].voterAddress ==
//                        voterAddress
//                    ) {
//                        return voter;
//                    }
//                }
//            }
//        }
//    }
//
//    function voteFor(string calldata objectId)
//        public
//        checkVoterVoted(objectId, msg.sender)
//        checkProposalExists(objectId)
//    {
//        proposalsMap[objectId].votersFor.push(
//            Voter({voterAddress: msg.sender, weight: 1})
//        );
//    }
//
//    function voteAgainst(string calldata objectId)
//        public
//        checkVoterVoted(objectId, msg.sender)
//        checkProposalExists(objectId)
//    {
//        proposalsMap[objectId].votersAgainst.push(
//            Voter({voterAddress: msg.sender, weight: 1})
//        );
//    }
//
//    function votersForCount(string calldata objectId)
//        public
//        view
//        checkProposalExists(objectId)
//        returns (uint256)
//    {
//        return proposalsMap[objectId].votersFor.length;
//    }
//
//    function votersAgainstCount(string calldata objectId)
//        public
//        view
//        checkProposalExists(objectId)
//        returns (uint256)
//    {
//        return proposalsMap[objectId].votersAgainst.length;
//    }
//
//    function compareStrings(string memory a, string memory b)
//        private
//        pure
//        returns (bool)
//    {
//        return (keccak256(abi.encodePacked((a))) ==
//            keccak256(abi.encodePacked((b))));
//    }
//}
