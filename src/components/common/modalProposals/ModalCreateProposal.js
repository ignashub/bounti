import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { Text, Button, Modal, Input } from "@nextui-org/react";
import abi from "../../../utils/Proposals.json";
import { getIpfsUser, updateUser } from "../generalFunctions/user";

function ModalCreateProposal(props) {
  const [proposalName, setProposalName] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [proposalVotedForThreshold, setProposalVotedForThreshold] = useState(0);
  const [daoContractTag, setDaoContractTag] = useState("");
  const [proposalId, setProposalId] = useState("");

  const { user } = useMoralis();

  const ethers = Moralis.web3Library;

  //variables for smart contract
  const contractAddress = "0x8a7a1605A9a3a6aFB81f7237325D3b3aead2004e";
  const contractABI = abi.abi;

  //Upload metadata of a Proposal
  const uploadMetadata = async () => {
    const Proposal = Moralis.Object.extend("Proposals");
    const proposalObject = new Proposal();
    // const userId = user.get("ethAddress");

    const metadata = {
      name: proposalName,
      description: proposalDescription,
      votedForThreshold: proposalVotedForThreshold,
    };

    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await file.saveIPFS();

    proposalObject.set("CID", file.hash());
    proposalObject.set("contractAddress", user.get("ethAddress"));
    console.log(file);

    proposalObject
      .save()
      .then(async (proposal) => {
        await setProposalId(proposal.id);
        console.log("Proposal ID: ", proposal.id);
        await addProposal(proposal.id, proposalVotedForThreshold);
      })
      .catch((err) => {
        alert(err.data.message);
      });
  };

  //adding proposal to the blockchain
  const addProposal = async (proposalId, votedForThreshold) => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const proposalsContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    const query = new Moralis.Query("DAOs");
    query.equalTo("daoTag", daoContractTag);
    const daoMoralis = await query.first();
    const daoContractAddress = daoMoralis.attributes.contractAddress;

    await proposalsContract.createProposal(
      proposalId,
      votedForThreshold,
      daoContractAddress
    );
  };

  const update = async (proposalId) => {
    const address = user.get("ethAddress");

    const userObject = await getIpfsUser(address);
    userObject.proposalIds.push(proposalId);
    await updateUser(userObject, address);
  };

  //Function to upload
  const upload = async () => {
    await uploadMetadata();
    await addProposal();

    await update(proposalId);
    props.onClose();
  };

  //Function to get saved info from ipfs
  const getIpfsUser = async () => {
    const query = new Moralis.Query("Users");
    const userContract = user.get("ethAddress");
    query.equalTo("contractAddress", userContract);
    const userMoralis = await query.first();
    const userCID = userMoralis.attributes.CID;
    const url = `https://gateway.moralisipfs.com/ipfs/${userCID}`;
    const response = await fetch(url);
    console.log(url);
    return response.json();
  };

  //get proposal
  const getProposal = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const proposalsContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const proposal = await proposalsContract.getProposal(proposalId);
      console.log(proposal);
      return proposal;
    }
  };

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
        <Button auto onClick={upload}>
          Create
        </Button>
        <Button auto onClick={getProposal}>
          get
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreateProposal;
