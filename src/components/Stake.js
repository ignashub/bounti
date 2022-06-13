import { Button } from "@nextui-org/react";
import ModalCreateUser from "./common/modalCreateUser/ModalCreateUser";
import React from "react";

function Stake(props) {
  const [visible, setVisible] = React.useState(false);

  function createDAOHandler() {
    setVisible(true);
    console.log("test");
  }

  function onAdd(id) {
    props.addDAO(id);
    closeModal();
  }

  function closeModal() {
    setVisible(false);
  }

  return (
    <div>
      <Button color="secondary" ghost onClick={createDAOHandler}>
        Create a Task
      </Button>
      {visible && (
        <ModalCreateUser id={props.id} open={visible} onClose={closeModal} />
      )}
    </div>
  );
}
export default Stake;
