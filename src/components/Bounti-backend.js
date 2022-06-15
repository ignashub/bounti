import React, { useEffect, useState, useReducer } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import abi from "../utils/Daos.json";
import FigureImage from "react-bootstrap/FigureImage";

function Main() {
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
  const contractAddress = "0x22A51eEe17627810FB4FdA74cb30AEf7A09512B8";
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
    const DAO = Moralis.Object.extend("DAOs");
    const dao = new DAO();
    const name = document.getElementById("DAOname").value;
    const tag = document.getElementById("DAOtag").value;
    const description = document.getElementById("DAOdesc").value;
    const tech = document.getElementById("DAOtech").value;
    const contract = document.getElementById("DAOcontract").value;
    const site = document.getElementById("DAOsite").value;
    const signature = document.getElementById("DAOsignature").value;
    const sections = document.getElementById("DAOsections").value;

    const metadata = {
      name: name,
      tag: tag,
      description: description,
      tech: tech,
      site: site,
      signature: signature,
      sections: sections,
    };

    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await file.saveIPFS();

    dao.set("CID", file.hash());
    dao.set("contractAddress", contract);
    await dao.save();
  };

  //Function to upload
  const upload = async () => {
    await uploadMetadata();
    await addDAO();
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
        const bountiContract = new ethers.Contract(contractAddress, contractABI, signer);
        const daoContract = document.getElementById("SelectedDAO").value;
        const dao = await bountiContract.getDao(daoContract);
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
          const bountiContract = new ethers.Contract(contractAddress, contractABI, signer);
          const bc = await bountiContract.getAllDaos();
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

    //adding dao to blockchain (this also adds the msg.sender to members array of added dao)
    const addDAO = async () => {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const bountiContract = new ethers.Contract(contractAddress, contractABI, signer);
      const daoContract = document.getElementById("DAOcontract").value;

      await bountiContract.addDao(daoContract);
    }

    // joining a dao
    const JoinDAO = async () => {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const bountiContract = new ethers.Contract(contractAddress, contractABI, signer);
      const daoContract = document.getElementById("DAOcontract").value;
  
      await bountiContract.joinDao(daoContract);
    }
}

export default Main;
