import React, {useState} from "react";
import {
  Text,
  Button,
  Modal,
  Input,
  Checkbox,
  Radio,
  Textarea,
} from "@nextui-org/react";
import {Moralis} from "moralis";
import {getTaskManagerContract} from "../generalFunctions/tasks";
import {getDaoAddress, checkIfMember} from "../generalFunctions/daos";
import {useMoralis} from "react-moralis";

function ModalCreateTask(props) {

  const {user} = useMoralis();

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [daoTag, setDaoTag] = useState("");
  const [taskReward, setTaskReward] = useState(0);
  const [percentageForReviewers, setPercentageForReviewers] = useState(0);
  const [taskClearance, setTaskClearance] = useState("");
  const [taskSection, setTaskSection] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [taskCID, setTaskCID] = useState("");

  // These useStates will be used later
  // const [taskStatus, setTaskStatus] = useState("");
  // const [taskOwner, setTaskOwner] = useState("");
  // const [taskReviewers, setTaskReviewers] = useState([]);
  // const [taskWorkers, setTaskWorkers] = useState([]);

  const createTask = async () => {
    const Task = Moralis.Object.extend("Task");
    const task = new Task();

    // console.log("Task Name: ", taskName)
    // console.log("Task Description: ", taskDescription)
    // // console.log("Task Details: ", taskDetails)
    // console.log("Task Level: ", taskClearance)
    // console.log("Task Section ID: ", taskSection)



    const metadata = {
      name: taskName,
      description: taskDescription,
      // details: taskDetails,
      clearance: taskClearance,
      sections: taskSection,
    };
    const daoContract = await getDaoAddress(daoTag);
    const userAddress = user.get("ethAddress");
    const isMember = await checkIfMember(daoContract, userAddress);
    if (isMember) {
      const file = new Moralis.File("file.json", {
        base64: btoa(JSON.stringify(metadata)),
      });

      await file.saveIPFS();

      task.set("CID", file.hash());
      task.save()
          .then(async (task) => {
            await setTaskId(task.id);
            console.log("Task ID: ", taskId)
            try {
               await addTaskToAvax(daoContract, task.id);
            } catch (err) {
              alert("The specified DAO does not exist")
            }
          })
          .catch(err => {
            alert(err.data.message);
          })
    } else {
      alert("You are not a member of this DAO")
    }
  };

  // Adding a task to the blockchain
  const addTaskToAvax = async (daoContract, id) => {
    const contract = await getTaskManagerContract();

    console.log("Id in Avax addTask: ", id)

    await contract.createTask(daoContract, id, taskReward, percentageForReviewers);
  }

  const create = async () => {
    await createTask();
    props.onClose();
  }


  // const check = async () => {
  //   console.log("Task Name: ", taskName)
  //   console.log("Task Description: ", taskDescription)
  //   console.log("DAO Tag: ", daoTag)
  //   let contract = "";
  //   try {
  //     contract = await getDaoAddress(daoTag);
  //   } catch (err) {
  //     alert("Errorrrr")
  //   }
  //   console.log("DAO contract: ", contract)
  //   console.log("Task Level: ", taskClearance)
  //   console.log("Task Section ID: ", taskSection)
  //   console.log("Task Reward: ", taskReward);
  //   console.log("Task Percentage: ", percentageForReviewers);
  //   // console.log("Task description: ", taskDescription);
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
          Create a Task:
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-title" b size={18}>
          Task's Name:
        </Text>
        <Input placeholder="Develop Notification services for MakerDAOs dApp"
        onChange={e => setTaskName(e.target.value)}/>
        <Text id="modal-title" b size={18}>
          DAO's Tag:
        </Text>
        <Input placeholder="CRV-DAO"
        onChange={e => setDaoTag(e.target.value)}/>
        <Text id="modal-title" b size={18}>
          Description:
        </Text>
        <Textarea placeholder="The following task requires the workers to further develop the Push Notification services for the MakerDAO dApp."
        onChange={e => setTaskDescription(e.target.value)}/>
        {/*<Text id="modal-title" b size={18}>*/}
        {/*  Owner:*/}
        {/*</Text>*/}
        {/*<Input placeholder="luc.jonkers.eth" />*/}
        <Text id="modal-title" b size={18}>
          Select the DAO Section that best Relates to the Task:
        </Text>
        <Checkbox.Group
          color="secondary"
          defaultValue={["General"]}
          value={taskSection}
          onChange={setTaskSection}
          size={"sm"}
        >
          <Checkbox value="General">General</Checkbox>
          <Checkbox value="DeFi">DeFi</Checkbox>
          <Checkbox value="Development">Development</Checkbox>
          <Checkbox value="Treasury">Treasury</Checkbox>
          <Checkbox value="Governance">Governance</Checkbox>
          <Checkbox value="Growth">Growth</Checkbox>
        </Checkbox.Group>
        <Text>
          This Task will be Available in Sections: {taskSection.join(", ")}
        </Text>
        <Text id="modal-title" b size={18}>
          Select the Task Clearance Level:
        </Text>
        <Radio.Group defaultValue="General" value={taskClearance} onChange={setTaskClearance} size={"sm"} color="secondary">
          <Radio value="General">General</Radio>
          <Radio value="Bronze">Bronze</Radio>
          <Radio value="Silver">Silver</Radio>
          <Radio value="Gold">Gold</Radio>
          <Radio value="God">God</Radio>
        </Radio.Group>
        <Text id="modal-title" b size={18}>
          Reward:
        </Text>
        <Input placeholder="5000 BTI" onChange={e => setTaskReward(e.target.value)} />
        <Text id="modal-title" b size={18}>
          Percentage of Reward for Reviewers:
        </Text>
        <Input placeholder="20" onChange={e => setPercentageForReviewers(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Cancel
        </Button>
        <Button auto onClick={create}>
          Create Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreateTask;
