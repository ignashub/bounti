import abi from "../../../utils/Proposals.json";
const { Moralis } = require("moralis");

const ethers = Moralis.web3Library;

const proposalsAddress = "0x06CAE1a6500872379E419Ab4267c38a9Db78d5d0";
const proposalsABI = abi.abi;

const status = ["In progress", "Completed"];

const getProposalsContract = async () => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(proposalsAddress, proposalsABI, signer);
};

//Gets proposal description from ipfs
const getProposalDescription = async (userWalletAddress) => {
  const query = new Moralis.Query("Proposals");
  query.equalTo("userWalletAddress", userWalletAddress);
  const userMoralis = await query.first();
  const proposalCID = userMoralis.attributes.CID;
  const url = `https://gateway.moralisipfs.com/ipfs/${proposalCID}`;
  const response = await fetch(url);
  const responseJSON = await response.json();

  return responseJSON.description;
};

//get proposal
const getProposal = async (proposalId) => {
  const proposalsContract = await getProposalsContract();
  const proposal = await proposalsContract.getProposal(proposalId);

  const formattedProposal = {
    owner: proposal.owner,
    status: proposal.status,
    votersFor: proposal.votersFor,
    votersAgainst: proposal.votersAgainst,
    completeThreshold: proposal.completeThreshold,
  };

  return formattedProposal;
};

//IPFS+AVAX get in one function, putting values together in one variable
const getFullProposalObject = async (userWalletAddress, proposalId) => {
  const proposalBlockchain = await getProposal(proposalId); //proposal info from the blockchain
  const proposalDescription = await getProposalDescription(userWalletAddress); //proposal description from the ipfs

  const proposal = {
    owner: proposalBlockchain.owner,
    status: proposalBlockchain.status,
    votersFor: proposalBlockchain.votersFor,
    votersAgainst: proposalBlockchain.votersAgainst,
    completeThreshold: proposalBlockchain.completeThreshold,
    description: proposalDescription,
  };

  return proposal;
};

const getAllDaoProposals = async (userWalletAddress, daoContracts) => {
  const contract = await getProposalsContract();
  const proposalsArray = [];
  for (let k = 0; k < daoContracts.length; k++) {
    if (
      k < daoContracts.length - 1 &&
      daoContracts[k + 1] === daoContracts[k]
    ) {
      continue;
    }
    const allProposals = await contract.getAllDaoProposals(daoContracts[k]);
    for (let i = 0; i < allProposals.length; i++) {
      const proposalId = allProposals[i];
      if (proposalId !== "") {
        const res = await contract.getProposal(allProposals[i]).catch((err) => {
          alert(err.data.message);
        });
        const fullProposal = await getFullProposalObject(
          userWalletAddress,
          proposalId
        );
        proposalsArray.push(fullProposal);
      }
    }
  }
  return proposalsArray;
};

// Function to get saved info from ipfs
const getProposalIpfs = async (userWalletAddress) => {
  // Getting data from Moralis
  const query = new Moralis.Query("Proposals");
  query.equalTo("userWalletAddress", userWalletAddress);
  const userMoralis = await query.first();
  const proposalCID = userMoralis.attributes.CID;

  // Getting data from IPFS
  const url = `https://gateway.moralisipfs.com/ipfs/${proposalCID}`;
  const response = await fetch(url);

  return response.json();
};

export { getProposalsContract, getAllDaoProposals, getFullProposalObject };
