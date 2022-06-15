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

const getAllDaoTasks = async (daoContract) => {
    const contract = await getTaskManagerContract();
    console.log("thiiiiis: ", daoContract)
    const allTasks = await contract.getAllDaoTasks(daoContract);
    const taskArray = [];
    for (let i = 0; i < allTasks.length; i++) {
        const taskId = allTasks[i];
        console.log("Here: ", taskId)
        if (taskId !== "") {
            console.log("ukyfjhfj")
            const res = await contract.getTask(allTasks[i])
                .catch(err => {
                    alert(err.data.message)
                });
            const task = res[0];
            console.log("i get smth from taks: ", task.id)
            taskArray.push(task[0]);
        }
    }
    return taskArray;
}

export {getTaskManagerContract, getMemberManagerContract, getAllDaoTasks};