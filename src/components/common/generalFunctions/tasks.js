import abi1 from "../../../utils/TaskManager.json";
import abi2 from "../../../utils/TaskMemberManager.json";
import {getDaoAvatar} from "./daos";
const {Moralis} = require("moralis");


const ethers = Moralis.web3Library;

const taskManagerAddress = "0xF6A81a3C1FA3b42534379F321F4F01242Ec630C5";
const taskManagerABI = abi1.abi;

const memberManagerAddress = "0x06CAE1a6500872379E419Ab4267c38a9Db78d5d0";
const memberManagerABI = abi2.abi;

const status = ["Not exist", "Pending", "In progress", "Review", "Completed"]

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

const getFullTaskObject = async (data, workers, reviewers) => {
    const getAvatar = await getDaoAvatar(data.daoContract);
    const ipfsData = await getTaskIpfs(data.id);
    const task = {
        id: data.id,
        reward: data.prize,
        status: status[data.status],
        reviewerPercentage: data.percentageForReviewers,
        avatar: getAvatar,
        dao: data.daoContract,
        owner: data.taskOwner,
        name: ipfsData.name,
        description: ipfsData.description,
        clearance: ipfsData.clearance,
        deadline: ipfsData.deadline,
        sections: ipfsData.sections,
        workers: workers,
        reviewers: reviewers
    }

    return task;
}

const getAllDaoTasks = async (daoContracts, userAddress) => {
    const contract = await getTaskManagerContract();
    const taskArray = [];
    for (let k = 0; k < daoContracts.length; k++) {
        if (k < (daoContracts.length -1) &&  daoContracts[k+1] === daoContracts[k]) {
            continue;
        }
        const allTasks = await contract.getAllDaoTasks(daoContracts[k]);
        for (let i = 0; i < allTasks.length; i++) {
            const taskId = allTasks[i];
            if (taskId !== "") {
                const res = await contract.getTask(allTasks[i])
                    .catch(err => {
                        alert(err.data.message)
                    });
                if (res[0].status === 1 || res[1].includes(userAddress) || res[2].includes(userAddress)) {
                    const task = res[0];
                    const fullTask = await getFullTaskObject(task, res[1], res[2]);
                    // task.status = status[task.status];
                    taskArray.push(fullTask);
                }
            }
        }
    }
    return taskArray;
}

const getTaskIpfs = async (taskId) => {
    // Getting data from Moralis
    const Task = Moralis.Object.extend("Task");
    const query = new Moralis.Query(Task);
    const taskMoralis = await query.get(taskId);
    const cid = taskMoralis.attributes.CID;

    // Getting data from IPFS
    const url = `https://gateway.moralisipfs.com/ipfs/${cid}`;
    const response = await fetch(url);
    return await response.json();
}

export {getTaskManagerContract, getMemberManagerContract, getAllDaoTasks};