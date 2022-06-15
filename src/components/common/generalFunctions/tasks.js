import abi1 from "../../../utils/TaskManager.json";
import abi2 from "../../../utils/TaskMemberManager.json";
const {Moralis} = require("moralis");

const ethers = Moralis.web3Library;

const taskManagerAddress = "0xF6A81a3C1FA3b42534379F321F4F01242Ec630C5";
const taskManagerABI = abi1.abi;

const memberManagerAddress = "0x06CAE1a6500872379E419Ab4267c38a9Db78d5d0";
const memberManagerABI = abi2.abi;

const getTaskManagerContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    return new ethers.Contract(taskManagerAddress, taskManagerABI, signer);
}

const getMemberManagerContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    return new ethers.Contract(memberManagerAddress, memberManagerABI, signer);
}

export {getTaskManagerContract, getMemberManagerContract};