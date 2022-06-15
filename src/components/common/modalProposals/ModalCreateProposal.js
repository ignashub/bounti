import React, { useState } from "react";
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
  const [allProposals, setProposals] = useState([]);

  const { user } = useMoralis();

  const ethers = Moralis.web3Library;

  //variables for smart contract
  const contractAddress = "0xb532381a3a181dFa55eD97a99a781256bAa2E91a";
  const contractABI = abi.abi;

  //Upload metadata of a Proposal
  const uploadMetadata = async () => {
    const Proposal = Moralis.Object.extend("Proposals");
    const proposalObject = new Proposal();

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
    proposalObject.set("Description", proposalDescription);
    proposalObject.set("userWalletAddress", user.get("ethAddress"));
    console.log(file);

    proposalObject
      .save()
      .then(async (proposal) => {
        await setProposalId(proposal.id);
        // console.log("Proposal ID: ", proposal.id);
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
    await getIpfsUser(user.get("ethAddress"));
  };

  //Function to upload
  const upload = async () => {
    await uploadMetadata();
    await addProposal();

    await update(proposalId);
    props.onClose();
  };

  //Function to get saved info from ipfs
  // const getIpfsProposal = async () => {
  //   const query = new Moralis.Query("Proposals");
  //   const userWalletAddress = user.get("ethAddress");
  //   query.equalTo("userWalletAddress", userWalletAddress);
  //   const userMoralis = await query.first();
  //   const proposalCID = userMoralis.attributes.CID;
  //   const url = `https://gateway.moralisipfs.com/ipfs/${proposalCID}`;
  //   const response = await fetch(url);
  //   console.log(responseJSON.description);
    
  //   return response.json();
  // };

    //Gets proposal description from ipfs
    const getProposalDescription = async () => {
      const query = new Moralis.Query("Proposals");
      const userWalletAddress = user.get("ethAddress");
      query.equalTo("userWalletAddress", userWalletAddress);
      const userMoralis = await query.first();
      const proposalCID = userMoralis.attributes.CID;
      const url = `https://gateway.moralisipfs.com/ipfs/${proposalCID}`;
      const response = await fetch(url);
      const responseJSON = await response.json();
      
      return responseJSON.description;
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

      const formattedProposal = {
        owner: proposal.owner,
        status: proposal.status,
        votersFor: proposal.votersFor,
        votersAgainst: proposal.votersAgainst,
        completeThreshold: proposal.completeThreshold,
      }
      // console.log(proposal);
      // console.log(formattedProposal);
      return formattedProposal;
    }
  };

    //IPFS+AVAX get in one function, putting values together in one variable
    const getFullProposal = async () => {
      const proposal = await getProposal();
      const description = await getProposalDescription();
    
      const fullProposal = {
        owner: proposal.owner,
        status: proposal.status,
        votersFor: proposal.votersFor,
        votersAgainst: proposal.votersAgainst,
        completeThreshold: proposal.completeThreshold,
        description: description
      }
      // setDao(fullProposal);
      console.log(fullProposal)
    }

    //getting all proposals from the blockchain
  //Addition; contract addresses need to be in correct format or else there will be a miss communication between avax and moralis
  const getAllProposals = async () => {
    const allProposals = [];
    const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const proposalContract = new ethers.Contract(contractAddress, contractABI, signer);
        const pc = await proposalContract.getAllProposal();
        for (const proposal of pc) {
          const query = new Moralis.Query("Proposals");
          console.log(proposal)
          console.log(proposal.contractAddress)
          await query.select("CID").equalTo("contractAddress", proposal.contractAddress);
          const qAnswer = await query.first();
          console.log(qAnswer)
          const proposalCID = qAnswer.attributes.CID;
          const url = `https://gateway.moralisipfs.com/ipfs/${proposalCID}`;
          const response = await fetch(url);
          console.log(response)
          const fullProposal = {
            pc: proposal,
            ipfs: await response.json()
          }
          allProposals.push(fullProposal)
          console.log(fullProposal)
        }
      setProposals(allProposals);
      }
  }

    //getting all daos from the blockchain
  //Addition; contract addresses need to be in correct format or else there will be a miss communication between avax and moralis
  // const getAllDAOs = async () => {
  //   const allDaos = [];
  //   const { ethereum } = window;
  //     if (ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       const bountiContract = new ethers.Contract(contractAddress, contractABI, signer);
  //       const bc = await bountiContract.getAllDaos();
  //       for (const dao of bc) {
  //         const query = new Moralis.Query("DAOs");
  //         console.log(dao)
  //         console.log(dao.contractAddress)
  //         await query.select("CID").equalTo("contractAddress", dao.contractAddress);
  //         const qAnswer = await query.first();
  //         console.log(qAnswer)
  //         const daoCID = qAnswer.attributes.CID;
  //         const url = `https://gateway.moralisipfs.com/ipfs/${daoCID}`;
  //         const response = await fetch(url);
  //         console.log(response)
  //         const fullDAO = {
  //           bc: dao,
  //           ipfs: await response.json()
  //         }
  //         allDaos.push(fullDAO)
  //         console.log(fullDAO)
  //       }
  //     setDaos(allDaos);
  //     }
  // }
  

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
        <Button auto onClick={getFullProposal}>
          get
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreateProposal;
