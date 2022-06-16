import {Moralis} from "moralis";
import abi from "../../../utils/Daos.json";

const ethers = Moralis.web3Library;

const address = "0x5DCc53E9faC64e9c6928fC5f00965B7E4eBd8bBC";
const ABI = abi.abi;

const getDaoAddress = async (daoTag) => {
    const query = new Moralis.Query("DAOs");
    query.equalTo("daoTag", daoTag);
    const dao = await query.first();
    // console.log("Thats the DAO contract that I get: ", dao.attributes.contractAddress)
    return dao.attributes.contractAddress;
}

const getContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    return new ethers.Contract(address, ABI, signer);
}

const getAllDaos = async () => {
    const contract = await getContract();
    return await contract.getAllDaos();
}

const checkIfMember = async (daoAddress, userAddress) => {
    const contract = await getContract();
    return await contract.checkMember(daoAddress, userAddress);
}

const getDaoAvatar = async (daoContract) => {
    //make response from ipfs image/logo url
    const responseJson = await getIpfsData(daoContract);
    return responseJson.image;
}

const getIpfsData = async (daoContract) => {
    const query = new Moralis.Query("DAOs");
    await query.select("CID").equalTo("contractAddress", daoContract);
    const qAnswer = await query.first();
    console.log(qAnswer)
    const daoCID = qAnswer.attributes.CID;
    const url = `https://gateway.moralisipfs.com/ipfs/${daoCID}`;
    const response = await fetch(url);
    //make response from ipfs image/logo url
    return await response.json();
}

const getDaoName = async (daoContract) => {
    const response = await getIpfsData(daoContract);
    return response.name;
}

export {getDaoAddress, getContract, checkIfMember, getAllDaos, getDaoAvatar, getDaoName};