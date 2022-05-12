import { Text, Button, Modal } from "@nextui-org/react";
import React from "react";
import { useState } from "react";

export default function Test() {
  const [visible, setVisible] = useState(false);
  return (
    <Modal closeButton aria-labelledby="modal-title" blur>
      <Modal.Header>
        <Text id="modal-title" b size={18}>
          OMGGGGGGGGGGGGGGGGGGG
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
        <Button auto flat color="error" onClick={setVisible(false)}>
          Close
        </Button>
        <Button auto onClick={setVisible(false)}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
