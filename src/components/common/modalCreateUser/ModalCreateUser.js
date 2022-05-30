import React, { useEffect, useState} from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { Text, Button, Modal, Input, Checkbox, Radio } from "@nextui-org/react";

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
  const [dao, setDao] = useState(null);
  const [allDaos, setDaos] = useState([]);

  //variables for smart contract
  const contractAddress = "0x8a7a1605A9a3a6aFB81f7237325D3b3aead2004e";
  const contractABI = abi.abi;

  //login function Moralis
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
      //getAllDAOs();
  }, [])

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

    dao.set("CID", file.hash());
    dao.set("contractAddress", contract);
    await dao.save();
  };

      //adding dao to blockchain (this also adds the msg.sender to members array of added dao)
  const addUser = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const userContract = new ethers.Contract(contractAddress, contractABI, signer);
    const daoContract = document.getElementById("DAOcontract").value;
    console.log(daoContract)
    await userContract.addDao(daoContract);
  }

  //Function to upload
  const upload = async () => {
    await uploadMetadata();
    await addDAO();
    props.onClose();
  };

  //Function to get saved info from ipfs
  const getIpfsDAO = async () => {
    const query = new Moralis.Query("DAOs");

    const daoContract = document.getElementById("SelectedDAO").value;
    query.equalTo("contractAddress", daoContract);
    const dao = await query.first();
    const daoCID = dao.attributes.CID;
    const url = `https://gateway.moralisipfs.com/ipfs/${daoCID}`;
    const response = await fetch(url);
    //setIpfsDAO(await response.json());
    //console.log(await response.json());
    return response.json();
  };

  //get single dao & members from that dao
  const getDAO = async () => {
    const { ethereum } = window;
    if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const userContract = new ethers.Contract(contractAddress, contractABI, signer);
        const daoContract = document.getElementById("SelectedDAO").value;
        const dao = await userContract.getDao(daoContract);
        //setDao(await dao);
        //console.log(await dao);
        return dao;
      }
  }

  //IPFS+AVAX get in one function, putting values together in one variable
  const getFullDAO = async () => {
    const dao = await getDAO();
    const ipfs = await getIpfsDAO();
  
    const fullDAO = {
      dao: dao,
      ipfs: ipfs
    }
    setDao(fullDAO);
    //console.log(fullDAO)
  }

  //getting all daos from the blockchain
  //Addition; contract addresses need to be in correct format or else there will be a miss communication between avax and moralis
    const getAllDAOs = async () => {
      const allDaos = [];
      const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const userContract = new ethers.Contract(contractAddress, contractABI, signer);
          const bc = await userContract.getAllDaos();
          for (const dao of bc) {
            const query = new Moralis.Query("DAOs");
            console.log(dao)
            console.log(dao.contractAddress)
            await query.select("CID").equalTo("contractAddress", dao.contractAddress);
            const qAnswer = await query.first();
            console.log(qAnswer)
            const daoCID = qAnswer.attributes.CID;
            const url = `https://gateway.moralisipfs.com/ipfs/${daoCID}`;
            const response = await fetch(url);
            console.log(response)
            const fullDAO = {
              bc: dao,
              ipfs: await response.json()
            }
            allDaos.push(fullDAO)
            console.log(fullDAO)
          }
        setDaos(allDaos);
        }
    }

    // joining a dao
    const JoinDAO = async () => {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const userContract = new ethers.Contract(contractAddress, contractABI, signer);
      const daoContract = document.getElementById("DAOcontract").value;
  
      await userContract.joinDao(daoContract);
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
        <Input labelLeft="username" placeholder="luc.jonkers.eth" id="userAlias" />
        <Text id="modal-title" b size={18}>
          Your Profile Picture NFT:
        </Text>
        <Input placeholder="https://opensea.io/assets/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/28001145" id="userPicture"/>
        <Text id="modal-title" b size={18}>
          Your Website:
        </Text>
        <Input labelLeft="https://" placeholder="www.lucjonkers.com" id="userWebsite"/>
        <Text id="modal-title" b size={18}>
          Select your DAO Clearance Level:
        </Text>
        <Radio.Group value="General" size={"sm"} color="secondary">
          <Radio value="General" id="userClearance">General</Radio>
          <Radio value="Bronze" id="userClearance">Bronze</Radio>
          <Radio value="Silver" id="userClearance">Silver</Radio>
          <Radio value="Gold" id="userClearance">Gold</Radio>
          <Radio value="God" id="userClearance">God</Radio>
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
