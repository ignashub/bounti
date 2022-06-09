import React from "react";
import { Text, Button, Modal } from "@nextui-org/react";

function ModalTask(props) {
  const [selected, setSelected] = React.useState([]);
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
          Develop Notification services for MakerDAOs dApp
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-title" b size={18}>
          Description:
          <Text>
            The follwoing task requires the workers to further develop the Push
            Notification services for the MakerDAO dApp.
          </Text>
        </Text>
        <Text id="modal-title" b size={18}>
          Details:
          <Text>Using EPNS, React, Sol, etc...</Text>
        </Text>
        <Text id="modal-title" b size={18}>
          Owner:
          <Text>johnster.eth</Text>
        </Text>
        <Text id="modal-title" b size={18}>
          Workers:
          <Text>crazyziu.eth, rx73.eth, hazza.eth</Text>
        </Text>
        <Text id="modal-title" b size={18}>
          Reviewers:
          <Text>Pending...</Text>
        </Text>
        <Text id="modal-title" b size={18}>
          Status:
          <Text>Waiting for Review...</Text>
        </Text>
        <Text id="modal-title" b size={18}>
          Reward:
          <Text>250 CRV & 50 BTI</Text>
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Close
        </Button>
        <Button auto onClick={props.onClose}>
          Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalTask;
