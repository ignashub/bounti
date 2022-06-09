import React from "react";
import { Text, Button, Modal, Radio, Spacer } from "@nextui-org/react";

function ModalVoteOnProposal(props) {
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
          Cast your Vote:
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-title" b size={18}>
          Proposal Name:
        </Text>
        <Text id="modal-title" size={16}>
          Re-imagine the Staking process to allow for community security:
        </Text>
        <Text id="modal-title" b size={18}>
          Proposal Description:
        </Text>
        <Text id="modal-title" size={16}>
          The staking process needs to be redesigned and built to allow for
          security checks and steps.
        </Text>
        <Text id="modal-title" b size={18}>
          Cast your Vote:
        </Text>
        <Radio.Group row value="primary">
          <Radio value="success" color="success" size="sm">
            For
          </Radio>
          <Spacer />
          <Radio value="error" color="error" size="sm">
            Against
          </Radio>
        </Radio.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Cancel
        </Button>
        <Button auto onClick={props.onClose}>
          Finish
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalVoteOnProposal;
