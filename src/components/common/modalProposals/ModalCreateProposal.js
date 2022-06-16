import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { Text, Button, Modal, Input } from "@nextui-org/react";
import {getIpfsUser, updateUser} from "../generalFunctions/user";
import { getProposalsContract, getFullProposalObject } from "../generalFunctions/proposals";
import {getDaoAddress, checkIfMember} from "../generalFunctions/daos";

function ModalCreateProposal(props) {

  const { user } = useMoralis();

  const [proposalName, setProposalName] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [proposalVotedForThreshold, setProposalVotedForThreshold] = useState(0);
  const [daoContractTag, setDaoContractTag] = useState("");
  const [proposalId, setProposalId] = useState("");
  const [allProposals, setProposals] = useState([]);


  //Upload metadata of a Proposal
  const createProposal = async () => {
    const Proposal = Moralis.Object.extend("Proposals");
    const proposalObject = new Proposal();

    const metadata = {
      name: proposalName,
      description: proposalDescription,
      votedForThreshold: proposalVotedForThreshold,
    };
    const daoContract = await getDaoAddress(daoContractTag);

    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await file.saveIPFS();

    proposalObject.set("CID", file.hash());
    proposalObject.set("Description", proposalDescription);
    proposalObject.set("userWalletAddress", user.get("ethAddress"));
    console.log(file);

    proposalObject
      .save()
      .then(async (proposal) => {
        await setProposalId(proposal.id);
          await addProposalToAvax(daoContract, proposal.id);
      })
      .catch((err) => {
        alert(err.data.message);
      });
  };

   // Adding a proposal to the blockchain
   const addProposalToAvax = async (daoContract, id) => {
    const contract = await getProposalsContract();

    console.log("objectId in Moralis and Proposal struct in blockchain: ", id)

    await contract.createProposal(id, proposalVotedForThreshold, daoContract);
  }

  //adding proposal to the blockchain
  // const addProposal = async (proposalId, votedForThreshold) => {
  //   const { ethereum } = window;
  //   const provider = new ethers.providers.Web3Provider(ethereum);
  //   const signer = provider.getSigner();
  //   const proposalsContract = new ethers.Contract(
  //     contractAddress,
  //     contractABI,
  //     signer
  //   );

  //   const query = new Moralis.Query("DAOs");
  //   query.equalTo("daoTag", daoContractTag);
  //   const daoMoralis = await query.first();
  //   const daoContractAddress = daoMoralis.attributes.contractAddress;

  //   await proposalsContract.createProposal(
  //     proposalId,
  //     votedForThreshold,
  //     daoContractAddress
  //   );
  // };

  //updates user with the proposal
  const update = async (proposalId) => {
    const userWallet = user.get("ethAddress");

    const userObject = await getIpfsUser(userWallet);
    userObject.proposalIds.push(proposalId);
    await updateUser(userObject, userWallet);
  };

  const create = async () => {
    try {
      await createProposal();
      await update(proposalId)
      props.onClose();
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={props.open}
      onClose={props.onClose}
      blur
      scroll={false}
      width="600px"
    >
      <Modal.Header>
        <Text id="modal-title" b size={18}>
          Create a Proposal:
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-title" b size={18}>
          DAO's Tag:
        </Text>
        <Input
          placeholder="CRV-DAO"
          onChange={(e) => {
            setDaoContractTag(e.target.value);
          }}
        />
        <Text id="modal-title" b size={18}>
          Proposal Name:
        </Text>
        <Input
          placeholder="Change DAO's Logo"
          onChange={(e) => {
            setProposalName(e.target.value);
          }}
        />
        <Text id="modal-title" b size={18}>
          Proposal Description:
        </Text>
        <Input
          placeholder="Motion to change the current logo, to that of the redesigned logo (see attatchment)"
          onChange={(e) => {
            setProposalDescription(e.target.value);
          }}
        />
        <Text id="modal-title" b size={18}>
          Voted For Threshold
        </Text>
        <Text>
          This threshold defines whats the percentage of people, who voted for,
          have to be in the DAO (e.g 50% of people has to vote for, for the
          proposal to be accepted)
        </Text>
        <Input
          placeholder="50"
          onChange={(e) => {
            setProposalVotedForThreshold(e.target.value);
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Cancel
        </Button>
        <Button auto onClick={create}>
          Create
        </Button>
        <Button auto onClick={getFullProposalObject(user.get("ethAddress"), proposalId)}>
          get
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreateProposal;
