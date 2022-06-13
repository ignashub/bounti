import React from "react";
import { Text, Button, Modal, Input, Checkbox, Radio } from "@nextui-org/react";

function ModalCreateUser(props) {
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
          Let's Create your Profile:
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-title" b size={18}>
          Your Name:
        </Text>
        <Input placeholder="Luc Jonkers" />
        <Text id="modal-title" b size={18}>
          Your Alias/Discord/ENS:
        </Text>
        <Input labelLeft="username" placeholder="luc.jonkers.eth" />
        <Text id="modal-title" b size={18}>
          Your Profile Picture NFT:
        </Text>
        <Input placeholder="https://opensea.io/assets/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/28001145" />
        <Text id="modal-title" b size={18}>
          Your Website:
        </Text>
        <Input labelLeft="https://" placeholder="www.lucjonkers.com" />
        <Text id="modal-title" b size={18}>
          Select your DAO Clearance Level:
        </Text>
        <Radio.Group value="A" size={"sm"} color="secondary">
          <Radio value="A">General</Radio>
          <Radio value="B">Bronze</Radio>
          <Radio value="C">Silver</Radio>
          <Radio value="D">Gold</Radio>
          <Radio value="E">God</Radio>
        </Radio.Group>
        <Text id="modal-title" b size={18}>
          Set a Recovery Password:
        </Text>
        <Input.Password
          clearable
          color="warning"
          initialValue="password"
          type="password"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Cancel
        </Button>
        <Button auto onClick={props.onClose}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreateUser;
