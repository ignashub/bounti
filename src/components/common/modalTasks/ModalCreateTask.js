import React from "react";
import {
  Text,
  Button,
  Modal,
  Input,
  Checkbox,
  Radio,
  Textarea,
} from "@nextui-org/react";

function ModalCreateTask(props) {
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
          Create a Task:
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-title" b size={18}>
          Task's Name:
        </Text>
        <Input placeholder="Develop Notification services for MakerDAOs dApp" />
        <Text id="modal-title" b size={18}>
          DAO's Tag:
        </Text>
        <Input placeholder="CRV-DAO" />
        <Text id="modal-title" b size={18}>
          Description:
        </Text>
        <Textarea placeholder="The follwoing task requires the workers to further develop the Push Notification services for the MakerDAO dApp." />
        <Text id="modal-title" b size={18}>
          Owner:
        </Text>
        <Input placeholder="luc.jonkers.eth" />
        <Text id="modal-title" b size={18}>
          Select the DAO Section that best Relates to the Task:
        </Text>
        <Checkbox.Group
          color="secondary"
          defaultValue={["General"]}
          value={selected}
          onChange={setSelected}
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
          This Task will be Available in Sections: {selected.join(", ")}
        </Text>
        <Text id="modal-title" b size={18}>
          Select the Task Clearance Level:
        </Text>
        <Radio.Group value="A" size={"sm"} color="secondary">
          <Radio value="A">General</Radio>
          <Radio value="B">Bronze</Radio>
          <Radio value="C">Silver</Radio>
          <Radio value="D">Gold</Radio>
          <Radio value="E">God</Radio>
        </Radio.Group>
        <Text id="modal-title" b size={18}>
          Reward:
        </Text>
        <Input placeholder="5000 BTI" />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Cancel
        </Button>
        <Button auto onClick={props.onClose}>
          Create Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreateTask;
