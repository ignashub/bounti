import React, {useState} from "react";
import { Text, Button, Modal, Input, Checkbox, Radio } from "@nextui-org/react";
import {useMoralis} from "react-moralis";
import {getIpfsUser, updateUser} from "../generalFunctions/user";
import {getDaoAddress, getContract} from "../generalFunctions/daos";


function ModalAddNewDAO(props) {

  const {user} = useMoralis();

  const [selected, setSelected] = useState([]);
  const [daoTag, setDaoTag] = useState("");

  // joining a dao
  const JoinDAO = async (daoContract) => {

    const bountiContract = await getContract();

    await bountiContract.joinDao(daoContract);
  }

  const update = async (daoContract) => {
    const address = user.get("ethAddress");

    const userObject = await getIpfsUser(address);
    userObject.daos.push(daoContract);
    await updateUser(userObject, address);
  }



  // const getDaoAddress = async () => {
  //   const query = new Moralis.Query("DAOs");
  //   query.equalTo("daoTag", daoTag);
  //   const dao = await query.first();
  //   console.log("Thats the DAO contract that I get: ", dao.attributes.contractAddress)
  //   return dao.attributes.contractAddress;
  // }

  const join = async () => {
    const daoContract = await getDaoAddress(daoTag);
    await JoinDAO(daoContract)
        .then(async () => {
          await update(daoContract);
        })
        .catch(err => {
          alert(err.data.message)
        });
    props.onClose();
  }

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
          Join a DAO:
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-title" b size={18}>
          DAO's Name:
        </Text>
        <Input placeholder="Curve DAO" id="DAOname"/>
        <Text id="modal-title" b size={18}>
          DAO's Tag:
        </Text>
        <Input placeholder="CRV-DAO" id="DAOtag"
               onChange={e => setDaoTag(e.target.value.trim())}/>
        <Text id="modal-title" b size={18}>
          Proof of Membership:
        </Text>
        <Input placeholder="Contract Address...." id="DAOcontract"/>
        <Text id="modal-title" b size={18}>
          Select the DAO Sections you participate in:
        </Text>
        <Checkbox.Group
          color="secondary"
          defaultValue={["General"]}
          value={selected}
          onChange={setSelected}
          size={"sm"}
          id="DAOsections"
        >
          <Checkbox value="General">General</Checkbox>
          <Checkbox value="DeFi">DeFi</Checkbox>
          <Checkbox value="Development">Development</Checkbox>
          <Checkbox value="Treasury">Treasury</Checkbox>
          <Checkbox value="Governance">Governance</Checkbox>
          <Checkbox value="Growth">Growth</Checkbox>
        </Checkbox.Group>
        <Text>Your Available Sections will be: {selected.join(", ")}</Text>
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
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Cancel
        </Button>
        <Button auto onClick={join}>
          Join DAO
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddNewDAO;
