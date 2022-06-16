import React, {useEffect, useState} from "react";
import { Text, Button, Modal } from "@nextui-org/react";
 import {getMemberManagerContract, getTaskManagerContract} from "../generalFunctions/tasks";
 import {getUserAlias} from "../generalFunctions/user";
import {useMoralis} from "react-moralis";

function ModalTask(props) {
  // const param = "";
  const {user} = useMoralis();
  const task = props.task;
  console.log("this is the task prop that i get: ", props.task)
  if (!props.task) {
    return null;
  }

  const applyReviewer = async() => {
    const contract = await getMemberManagerContract();
    await contract.addReviewer(task.realId);
    props.onClose();
  }

  const applyWorker = async() => {
    const contract = await getMemberManagerContract();
    await contract.addWorker(task.realId);
    props.onClose();
  }

  const completeWork = async() => {
    const contract = await getMemberManagerContract();
    await contract.completeWorkerPart(task.realId);
    props.onClose();
  }

  const beginTask = async () => {
    const contract = await getTaskManagerContract();
    await contract.beginTask(task.realId);
    props.onClose();
  }


  const renderSwitch = function (param) {
    switch (param) {
      case "Review":
        return (
          <Button auto onClick={props.onClose}>
            Review
          </Button>
        );
      case "In progress":
        return (
          <Button auto onClick={completeWork}>
            Set as Complete
          </Button>
        );
      case "Pending":
        const address = user.get("ethAddress");
        getUserAlias(address)
            .then(alias => {
              if(task.workers && task.reviewers) {
                console.log("DFCGHVBJNKLHJGYUTCGVBHJGUTFGCVBNHJGFGCV")
                if (alias === task.owner && task.workers.length >= 1 && task.reviewers.length >= 1) {
                  console.log("DRTFGYHJKLJHGFTHDTRFGHJKL;JGTFDRGHJKL")
                  return (
                      <Button auto onClick={beginTask}>
                        Begin task
                      </Button>
                  );
                }
              }
            });
        return (
            <Button.Group color="secondary" ghost>
              <Button auto flat color="error" onClick={props.onClose}>
                Close
              </Button>
              <Button onClick={applyReviewer}>Apply as Reviewer</Button>
              <Button onClick={applyWorker}>Take Bounti</Button>
            </Button.Group>
        );
      default:
        return (
          <Button.Group color="secondary" ghost>
            <Button auto flat color="error" onClick={props.onClose}>
              Close
            </Button>
            <Button onClick={applyReviewer}>Apply as Reviewer</Button>
            <Button onClick={applyWorker}>Take Bounti</Button>
          </Button.Group>
        );
    }
  };

  const getWorkers = () => {
    let allWorkers = "";
    if(task.workers) {
      for (let i = 0; i < task.workers.length; i++) {
        allWorkers += task.workers[i];
        if (i < task.workers.length - 1) {
          allWorkers += ", ";
        }
      }
    }
    return allWorkers;
  }

  const getReviewers = () => {
    let allReviewers = "";
    if (task.reviewers) {
      for (let i = 0; i < task.reviewers.length; i++) {
        allReviewers += task.reviewers[i];
        if (i < task.reviewers.length - 1) {
          allReviewers += ", ";
        }
      }
    }
    return allReviewers;
  }

  const getSections = () => {
    let allSections = "";
    if (task.sections) {
      for (let i = 0; i < task.sections.length; i++) {
        allSections += task.sections[i];
        if (i < task.sections.length - 1) {
          allSections += ", ";
        }
      }
    }
    return allSections;
  }

  // const checkTask = () => {
  //   if (task) {
  //     return true;
  //   }
  //   return false;
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
        {task.name}
      </Text>
    </Modal.Header>
    <Modal.Body>
      <Text id="modal-title" b size={18}>
        Description:
        <Text>
          {task.description}
        </Text>
      </Text>
      <Text id="modal-title" b size={18}>
        Owner:
        <Text>{task.owner}</Text>
      </Text>
      <Text id="modal-title" b size={18}>
        Workers:
        <Text>{getWorkers()}</Text>
      </Text>
      <Text id="modal-title" b size={18}>
        Reviewers:
        <Text>{getReviewers()}</Text>
      </Text>
      <Text id="modal-title" b size={18}>
        Sections:
        <Text>{getSections()}</Text>
      </Text>
      <Text id="modal-title" b size={18}>
        Clearance:
        <Text>{task.clearance}</Text>
      </Text>
      <Text id="modal-title" b size={18}>
        Status:
        <Text>{task.status}</Text>
      </Text>
      <Text id="modal-title" b size={18}>
        Reward:
        <Text>{task.reward.toNumber()} BTI</Text>
      </Text>
      <Text id="modal-title" b size={18}>
        Percentage for Reviewers:
        <Text>{task.reviewerPercentage.toNumber()}%</Text>
      </Text>
    </Modal.Body>
    <Modal.Footer>{renderSwitch(task.status)}</Modal.Footer>
  </Modal>
  );
}

export default ModalTask;
