import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { Text, Button, Modal, Input, Radio } from "@nextui-org/react";
import abi from "../../../utils/Users.json";

function ModalCreateUser(props) {
  const [userName, setUserName] = useState("");
  const [userAlias, setUserAlias] = useState("");
  const [userPicture, setUserPicture] = useState(null);
  const [userWebsite, setUserWebsite] = useState("");
  const [userClearance, setUserClearance] = useState("");
  const [createUser, setcreateUser] = useState(null);
  const [allcreateUsers, setcreateUsers] = useState([]);

  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  const ethers = Moralis.web3Library;

  //variables for smart contract
  const contractAddress = "0xF4A3dc8e7E2dc1f0CB000aDBe2C13f7CF5632811";
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

  //   Upload metadata of an User
  const uploadMetadata = async (imageURL) => {
    const User = Moralis.Object.extend("Users");
    const userObject = new User();
    const tasksIds = [];
    const proposalsIds = [];

    const metadata = {
      name: userName,
      alias: userAlias,
      picture: imageURL,
      website: userWebsite,
      clearance: userClearance,
      tasksIds: tasksIds,
      proposalsIds: proposalsIds,
    };

    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await file.saveIPFS();

    userObject.set("CID", file.hash());
    userObject.set("contractAddress", user.get("ethAddress"));
    console.log(file);
    await userObject.save();
  };

  //adding user to blockchain
  const addUser = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const userContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const userAddress = user.get("ethAddress");
    console.log(userAddress);
    // await userContract.addUser();
  };

  //Upload an image
  const uploadImage = async () => {
    const CIDImage = Moralis.Object.extend("CIDImage");
    const cidimage = new CIDImage();
    console.log("test");
    const data = userPicture[0];
    console.log(data);
    const file = new Moralis.File(data.name, data);
    await file.saveIPFS();

    cidimage.set("cid", file.hash());
    await cidimage.save();

    return file.ipfs(); //url where is the image is stored
  };

  //Function to upload
  const upload = async () => {
    const imageInMetadata = await uploadImage(userPicture[0]);
    await uploadMetadata(imageInMetadata);
    await addUser();
    props.onClose();
  };

  //Function to get saved info from ipfs
  const getIpfsUser = async () => {
    const query = new Moralis.Query("Users");
    const userContract = user.get("ethAddress");
    query.equalTo("contractAddress", userContract);
    const userMoralis = await query.first();
    const userCID = userMoralis.attributes.CID;
    const url = `https://gateway.moralisipfs.com/ipfs/${userCID}`;
    const response = await fetch(url);
    return response.json();
  };

  //get single user from the blockchain
  const getUser = async () => {
    const userAddress = user.get("ethAddress");
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const userContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const userBlockchain = await userContract.getUser(userAddress);
      return userBlockchain;
    }
  };

  // IPFS+AVAX get in one function, putting values together in one variable
  const getFullUser = async () => {
    const user = await getUser();
    const ipfs = await getIpfsUser();

    const fullUser = {
      user: user,
      ipfs: ipfs,
    };
    setcreateUser(fullUser);
    console.log(fullUser);
  };

  //getting all users from the blockchain
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
      const uc = await userContract.getAllUsers();
      for (const user of uc) {
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
          uc: user,
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
        <Input
          placeholder="Luc Jonkers"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <Text id="modal-title" b size={18}>
          Your Alias/Discord/ENS:
        </Text>
        <Input
          labelLeft="username"
          placeholder="luc.jonkers.eth"
          onChange={(e) => setUserAlias(e.target.value)}
          value={userAlias}
        />
        <Text id="modal-title" b size={18}>
          Your Profile Picture NFT:
        </Text>
        <Input
          type="file"
          placeholder="https://opensea.io/assets/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/28001145"
          onChange={(e) => setUserPicture(e.target.files)}
        />
        <Text id="modal-title" b size={18}>
          Your Website:
        </Text>
        <Input
          labelLeft="https://"
          placeholder="www.lucjonkers.com"
          onChange={(e) => setUserWebsite(e.target.value)}
          value={userWebsite}
        />
        <Text id="modal-title" b size={18}>
          Select your DAO Clearance Level:
        </Text>
        <Radio.Group size={"sm"} color="secondary">
          <Radio
            value="General"
            onChange={(e) => {
              setUserClearance("General");
            }}
          >
            General
          </Radio>
          <Radio
            value="Bronze"
            onChange={(e) => {
              setUserClearance("Bronze");
            }}
          >
            Bronze
          </Radio>
          <Radio
            value="Silver"
            onChange={(e) => {
              setUserClearance("Silver");
            }}
          >
            Silver
          </Radio>
          <Radio
            value="Gold"
            onChange={(e) => {
              setUserClearance("Gold");
            }}
          >
            Gold
          </Radio>
          <Radio
            value="God"
            onChange={(e) => {
              setUserClearance("God");
            }}
          >
            God
          </Radio>
        </Radio.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Cancel
        </Button>
        <Button auto onClick={upload}>
          Create
        </Button>
        <Button auto onClick={getFullUser}>
          Get User
        </Button>
        <Button auto onClick={upload}>
          Get Users
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreateUser;
