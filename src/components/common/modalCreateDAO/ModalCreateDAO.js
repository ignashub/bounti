import React from "react";
import { Text, Button, Modal, Input, Textarea } from "@nextui-org/react";

function ModalCreate(props) {
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
          Create a DAO:
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-title" b size={18}>
          DAO's Name:
        </Text>
        <Input placeholder="Curve DAO" />
        <Text id="modal-title" b size={18}>
          DAO Username Inside Bounti:
        </Text>
        <Input placeholder="CRV-DAO" />
        <Text id="modal-title" b size={18}>
          DAO Type:
        </Text>
        <Input placeholder="Decentralized Finance DAO" />
        <Text id="modal-title" b size={18}>
          DAO Description:
        </Text>
        <Textarea placeholder="Curve is an exchange liquidity pool on Ethereum (like Uniswap) designed for (1) extremely efficient stablecoin trading (2) low risk, supplemental fee income for liquidity providers, without an opportunity cost." />
        <Text id="modal-title" b size={18}>
          DAO Technology:
        </Text>
        <Input placeholder="Ethereum" />
        <Text id="modal-title" b size={18}>
          DAO Contract Address:
        </Text>
        <Input placeholder="0xD533a949740bb3306d119CC777fa900bA034cd52" />
        <Text id="modal-title" b size={18}>
          Offical Site:
        </Text>
        <Input placeholder="https://www.curve.fi" />
        <Text id="modal-title" b size={18}>
          Multi-Signature Members: (3 to 5 members)
        </Text>
        <Input placeholder="john.eth, hsdb3.eth, richyx.eth" />
        <Text id="modal-title" b size={18}>
          DAO Sections:
        </Text>
        <Textarea placeholder="Treasury, Governance, Development, DeFi, Advertising and Social Media, etc" />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Cancel
        </Button>
        <Button auto onClick={props.onClose}>
          Add DAO
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreate;
