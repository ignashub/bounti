import React from "react";
import {
  Text,
  Button,
  Modal,
  Radio,
  Input,
  Textarea,
  Divider,
  Spacer,
} from "@nextui-org/react";

function ModalReviewTask(props) {
  const [selected, setSelected] = React.useState([]);
  const [selectedDropdown, setSelectedDropdown] = React.useState([]);

  const selectedValue = React.useMemo(
    () => Array.from(selectedDropdown).join(", ").replaceAll("_", " "),
    [selectedDropdown]
  );

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
        <Text id="modal-title" b size={22}>
          Review: Develop Notification services
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
          Reward:
          <Text>250 CRV & 50 BTI</Text>
        </Text>
        <Spacer y={1} />
        <Divider />
        <Spacer y={1} />
        <Text id="modal-title" b size={18}>
          Worker 1:
          <Text>Has the Task been completed?</Text>
        </Text>
        <Radio.Group
          orientation="horizontal"
          label="Colors"
          defaultValue="primary"
        >
          <Radio value="success" color="success" size="sm">
            Yes
          </Radio>
          <Radio value="error" color="error" size="sm">
            No
          </Radio>
        </Radio.Group>
        <Text>Give this Worker a grade for their work out of 10</Text>
        <Input placeholder="6" />
        <Text>Give this Worker a Review for their work:</Text>
        <Textarea placeholder="The above task has been completed to an average standard." />
        <Spacer y={1} />
        <Divider />
        <Spacer y={1} />
        <Text id="modal-title" b size={18}>
          Worker 2:
          <Text>Has the Task been completed?</Text>
        </Text>
        <Radio.Group
          orientation="horizontal"
          label="Colors"
          defaultValue="primary"
        >
          <Radio value="success" color="success" size="sm">
            Yes
          </Radio>
          <Radio value="error" color="error" size="sm">
            No
          </Radio>
        </Radio.Group>
        <Text>Give this Worker a grade for their work out of 10</Text>
        <Input placeholder="6" />
        <Text>Give this Worker a Review for their work:</Text>
        <Textarea placeholder="The above task has been completed to an average standard." />
        <Spacer y={1} />
        <Divider />
        <Spacer y={1} />
        <Text id="modal-title" b size={18}>
          Worker 3:
          <Text>Has the Task been completed?</Text>
        </Text>
        <Radio.Group
          orientation="horizontal"
          label="Colors"
          defaultValue="primary"
        >
          <Radio value="success" color="success" size="sm">
            Yes
          </Radio>
          <Radio value="error" color="error" size="sm">
            No
          </Radio>
        </Radio.Group>
        <Text>Give this Worker a grade for their work out of 10</Text>
        <Input placeholder="6" />
        <Text>Give this Worker a Review for their work:</Text>
        <Textarea placeholder="The above task has been completed to an average standard." />
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

export default ModalReviewTask;
