import {Moralis} from "moralis";
import abi from "../../../utils/Daos.json";

const ethers = Moralis.web3Library;

const address = "0x1A8e2E734077ae13FBC2157Fbdbc69b878d19030";
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

const checkIfMember = async (daoAddress, userAddress) => {
    const contract = await getContract();
    return await contract.checkMember(daoAddress, userAddress);
}

export {getDaoAddress, getContract, checkIfMember};