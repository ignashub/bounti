import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { Text, Button, Modal, Input, Checkbox, Radio } from "@nextui-org/react";
import abi from "../../../utils/Users.json";

function ModalCreateUser(props) {
  const [selected, setSelected] = React.useState([]);

  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  const ethers = Moralis.web3Library;

  //const [image, setImage] = useState(null);
  const [createUser, setcreateUser] = useState(null);
  const [allcreateUsers, setcreateUsers] = useState([]);

  //variables for smart contract
  const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const contractABI = abi.abi;

  //login function Moralis
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" }).catch(
        function (error) {
          console.log(error);
        }
      );
    }
  };

  useEffect(() => {
    //getAllDAOs();
  }, []);

  const logOut = async () => {
    await logout();
  };

  //   Upload metadata object: name, description, image
  const uploadMetadata = async () => {
    const User = Moralis.Object.extend("Users");
    const user = new User();
    const name = document.getElementById("userName").value;
    const alias = document.getElementById("userAlias").value;
    const picture = document.getElementById("userPicture").value;
    const website = document.getElementById("userWebsite").value;
    const clearance = document.getElementById("userClearance").value;

    const metadata = {
      name: name,
      alias: alias,
      picture: picture,
      website: website,
      clearance: clearance,
    };

    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await file.saveIPFS();

    user.set("CID", file.hash());
    await user.save();
  };

  //adding dao to blockchain (this also adds the msg.sender to members array of added dao)
  const addUser = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const userContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const daoContract = document.getElementById("DAOcontract").value;
    console.log(daoContract);
    await userContract.addDao(daoContract);
  };

  //Function to upload
  const upload = async () => {
    await uploadMetadata();
    await addUser();
    props.onClose();
  };

  //Function to get saved info from ipfs
  const getIpfsUser = async () => {
    const query = new Moralis.Query("Users");

    const userContract = document.getElementById("SelectedUser").value;
    query.equalTo("contractAddress", userContract);
    const user = await query.first();
    const userCID = user.attributes.CID;
    const url = `https://gateway.moralisipfs.com/ipfs/${userCID}`;
    const response = await fetch(url);
    return response.json();
  };

  //IPFS+AVAX get in one function, putting values together in one variable
  // const getFullUser = async () => {
  //   const user = await getUser();
  //   const ipfs = await getIpfsUser();

  //   const fullUser = {
  //     user: user,
  //     ipfs: ipfs,
  //   };
  //   setcreateUser(fullUser);
  //   console.log(fullUser);
  // };

  //getting all daos from the blockchain
  //Addition; contract addresses need to be in correct format or else there will be a miss communication between avax and moralis
  const getAllUsers = async () => {
    const allUsers = [];
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const userContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const bc = await userContract.getAllUsers();
      for (const user of bc) {
        const query = new Moralis.Query("Users");
        console.log(user);
        console.log(user.contractAddress);
        await query
          .select("CID")
          .equalTo("contractAddress", user.contractAddress);
        const qAnswer = await query.first();
        console.log(qAnswer);
        const userCID = qAnswer.attributes.CID;
        const url = `https://gateway.moralisipfs.com/ipfs/${userCID}`;
        const response = await fetch(url);
        console.log(response);
        const fullUser = {
          bc: user,
          ipfs: await response.json(),
        };
        allUsers.push(fullUser);
        console.log(fullUser);
      }
      setcreateUsers(allUsers);
    }
  };

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
        <Input placeholder="Luc Jonkers" id="userName" />
        <Text id="modal-title" b size={18}>
          Your Alias/Discord/ENS:
        </Text>
        <Input
          labelLeft="username"
          placeholder="luc.jonkers.eth"
          id="userAlias"
        />
        <Text id="modal-title" b size={18}>
          Your Profile Picture NFT:
        </Text>
        <Input
          placeholder="https://opensea.io/assets/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/28001145"
          id="userPicture"
        />
        <Text id="modal-title" b size={18}>
          Your Website:
        </Text>
        <Input
          labelLeft="https://"
          placeholder="www.lucjonkers.com"
          id="userWebsite"
        />
        <Text id="modal-title" b size={18}>
          Select your DAO Clearance Level:
        </Text>
        <Radio.Group value="General" size={"sm"} color="secondary">
          <Radio value="General" id="userClearance">
            General
          </Radio>
          <Radio value="Bronze" id="userClearance">
            Bronze
          </Radio>
          <Radio value="Silver" id="userClearance">
            Silver
          </Radio>
          <Radio value="Gold" id="userClearance">
            Gold
          </Radio>
          <Radio value="God" id="userClearance">
            God
          </Radio>
        </Radio.Group>
        {/* <Text id="modal-title" b size={18}>
          Set a Recovery Password:
        </Text>
        <Input.Password
          clearable
          color="warning"
          initialValue="password"
          type="password"
        /> */}
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
