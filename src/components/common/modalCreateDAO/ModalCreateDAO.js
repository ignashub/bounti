import { Text, Button, Modal, Input, Textarea } from "@nextui-org/react";

//Added bounti-backend code to test on front end
import React, { useEffect, useState, useRef} from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import abi from "../../../utils/Daos.json";
import {getContract} from "../generalFunctions/daos";

function ModalCreate(props) {

    //const [image, setImage] = useState(null);
    const [daoImage, setDaoImage] = useState(null);
    const [daoName, setDaoName] = useState("");
    const [daoTag, setDaoTag] = useState("");
    const [daoDesc, setDaoDesc] = useState("");
    const [daoTech, setDaoTech] = useState("");
    const [daoContract, setDaoContract] = useState("");
    const [daoSections, setDaoSections] = useState("");
    const [daoSignature, setDaoSignature] = useState("");
    const [daoSite, setDaoSite] = useState("");
    const [daoType, setDaoType] = useState("");

    const inputRef = useRef();
  
    //variables for smart contract
    const contractAddress = "0x24dE6AE7169DaC5d2A320A066a21D381099dc22A";
    const contractABI = abi.abi;
  
    //Upload an image
    const uploadImage = async () => {
      const CIDImage = Moralis.Object.extend("CIDImage");
      const cidimage = new CIDImage();
      const data = daoImage;
      console.log(data);
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();

      cidimage.set("CID", file.hash());
      await cidimage.save();

      //url where is the image is stored
      return file.ipfs();

    };


    //Upload metadata object: name, description, image
    const uploadMetadata = async (imageURL) => {
      const DAO = Moralis.Object.extend("DAOs");
      const dao = new DAO();

      const metadata = {
        name: daoName,
        tag: daoTag,
        type: daoType,
        description: daoDesc,
        tech: daoTech,
        site: daoSite,
        signature: daoSignature,
        sections: daoSections,
        image: imageURL,
      };
  
      const file = new Moralis.File("file.json", {
        base64: btoa(JSON.stringify(metadata)),
      });
      console.log(file.hash());
      await file.saveIPFS({useMasterKey:true});
  
      dao.set("CID", file.hash());
      dao.set("contractAddress", daoContract);
      dao.set("daoTag", daoTag);
      await dao.save();
    };
  
    //Function to upload
    const upload = async () => {
      const imageinmetadata = await uploadImage();
      await uploadMetadata(imageinmetadata);
      await addDAO();
      props.onClose();
    };
  
   //adding dao to blockchain (this also adds the msg.sender to members array of added dao)
      const addDAO = async () => {
        const bountiContract = await getContract();
        const daoContract = document.getElementById("DAOcontract").value;

        await bountiContract.addDao(daoContract);
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
          Create a DAO:
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-title" b size={18}>
          DAO's Name:
        </Text>
        <Input onChange={e => setDaoName(e.target.value)} value={daoName} placeholder="Curve DAO" id="DAOname" />
        <Text id="modal-title" b size={18}>
          DAO Username Inside Bounti:
        </Text>
        <Input onChange={e => setDaoTag(e.target.value)} value={daoTag} placeholder="CRV-DAO" id="DAOtag"/>
        <Text id="modal-title" b size={18}>
          DAO Type:
        </Text>
        <Input onChange={e => setDaoType(e.target.value)} value={daoType}placeholder="Decentralized Finance DAO" id="DAOtype"/>
        <Text id="modal-title" b size={18}>
          DAO Description:
        </Text>
        <Textarea onChange={e => setDaoDesc(e.target.value)} value={daoDesc} id="DAOdesc" placeholder="Curve is an exchange liquidity pool on Ethereum (like Uniswap) designed for (1) extremely efficient stablecoin trading (2) low risk, supplemental fee income for liquidity providers, without an opportunity cost." />
        <Text id="modal-title" b size={18}>
          DAO Technology:
        </Text>
        <Input onChange={e => setDaoTech(e.target.value)} value={daoTech} placeholder="Ethereum" id="DAOtech"/>
        <Text id="modal-title" b size={18}>
          DAO Contract:
        </Text>
        <Input onChange={e => setDaoContract(e.target.value)} value={daoContract} placeholder="0xba35F5dA6d26d638b756bbb6B80050a8D4290b02" id="DAOcontract" />
        <Text id="modal-title" b size={18}>
          Offical Site:
        </Text>
        <Input onChange={e => setDaoSite(e.target.value)} value={daoSite} placeholder="https://www.curve.fi" id="DAOsite"/>
        <Text id="modal-title" b size={18}>
          Multi-Signature Members: (3 to 5 members)
        </Text>
        <Input onChange={e => setDaoSignature(e.target.value)} value={daoSignature} placeholder="john.eth, hsdb3.eth, richyx.eth" id="DAOsignature"/>
        <Text id="modal-title" b size={18}>
          DAO Sections:
        </Text>
        <Input onChange={e => setDaoSections(e.target.value)} value={daoSections} placeholder="Treasury, Governance, Development, DeFi, Advertising and Social Media, etc" id="DAOsections" />
        <Text id="modal-title" b size={18}>
          DAO Logo:
        </Text>
        <input type="file" id="DAOimage"
        onChange={() => setDaoImage(inputRef.current.files[0])}
        ref={inputRef}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Cancel
        </Button>
        <Button auto onClick={upload}>
          Add DAO
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreate;
