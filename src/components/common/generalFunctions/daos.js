import {Moralis} from "moralis";
import abi from "../../../utils/Daos.json";

const ethers = Moralis.web3Library;

const address = "0x5DCc53E9faC64e9c6928fC5f00965B7E4eBd8bBC";
const ABI = abi.abi;

const getDaoAddress = async (daoTag) => {
    const query = new Moralis.Query("DAOs");
    query.equalTo("daoTag", daoTag);
    const dao = await query.first();
    console.log("Thats the DAO contract that I get: ", dao.attributes.contractAddress)
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

export {getDaoAddress, getContract, checkIfMember, getAllDaos};