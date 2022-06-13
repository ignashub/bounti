import React from "react";
import { Text, Button, Modal, Input, Checkbox } from "@nextui-org/react";

function ModalCreateReading(props) {
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
          Create a New Weekly Reading Task:
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-title" b size={18}>
          Reading Name:
        </Text>
        <Input placeholder="Change DAO's Logo" />
        <Text id="modal-title" b size={18}>
          Reading Link:
        </Text>
        <Input
          type="url"
          placeholder="Motion to change the current logo, to that of the redesigned logo (see attatchment)"
        />
        <Text id="modal-title" b size={18}>
          Select DAO's to add this Reading to:
        </Text>
        <Checkbox.Group
          color="secondary"
          defaultValue={["General"]}
          value={selected}
          onChange={setSelected}
          size={"sm"}
        >
          <Checkbox value="Curve">Curve DAO</Checkbox>
          <Checkbox value="Maker">Maker DAO</Checkbox>
          <Checkbox value="DAI">Details</Checkbox>
          <Checkbox value="Balancer">Balancer DAO</Checkbox>
        </Checkbox.Group>
        <Text>This Reading will be Available to: {selected.join(", ")}</Text>
        <Text id="modal-title" b size={18}>
          Set Vote Option 1:
        </Text>
        <Input placeholder="For" />
        <Text id="modal-title" b size={18}>
          Set Vote Option 2:
        </Text>
        <Input placeholder="Against" />
        <Text id="modal-title" b size={18}>
          Vote Contract Address:
        </Text>
        <Input placeholder="0xD533a949740bb3306d119CC777fa900bA034cd52" />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Cancel
        </Button>
        <Button auto onClick={props.onClose}>
          Create Proposal
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreateReading;
