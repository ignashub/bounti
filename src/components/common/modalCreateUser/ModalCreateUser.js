import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { Text, Button, Modal, Input, Radio } from "@nextui-org/react";

function ModalCreateUser(props) {
  const [userName, setUserName] = useState("");
  const [userAlias, setUserAlias] = useState("");
  const [userPicture, setUserPicture] = useState(null);
  const [userWebsite, setUserWebsite] = useState("");
  const [userClearance, setUserClearance] = useState("");
  const [userOnChainExperience, setUserOnChainExperience] = useState("");
  const [userOffChainExperience, setUserOffChainExperience] = useState("");
  const [userCredentials, setUserCredentials] = useState("");
  const [userAbout, setUserAbout] = useState("");

  const { user } = useMoralis();

  //   Upload metadata of an User
  const uploadMetadata = async (imageURL) => {
    const User = Moralis.Object.extend("Users");
    const userObject = new User();
    const userId = user.get("ethAddress");
    const taskIds = [];
    const proposalIds = [];
    const daos = [];

    const metadata = {
      id: userId,
      name: userName,
      alias: userAlias,
      picture: imageURL,
      website: userWebsite,
      clearance: userClearance,
      taskIds: taskIds,
      proposalIds: proposalIds,
      daos: daos,
      onChainExperience: userOnChainExperience,
      offChainExperience: userOffChainExperience,
      credentials: userCredentials,
      about: userAbout,
    };

    const file = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await file.saveIPFS();

    userObject.set("CID", file.hash());
    userObject.set("walletAddress", user.get("ethAddress"));
    console.log(file);
    await userObject.save();
  };

  //Upload an image
  const uploadImage = async () => {
    const CIDImage = Moralis.Object.extend("CIDImage");
    const cidimage = new CIDImage();
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
    props.onClose();
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
          Name:
        </Text>
        <Input
          placeholder="Luc Jonkers"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <Text id="modal-title" b size={18}>
          Alias/Discord/ENS:
        </Text>
        <Input
          labelLeft="username"
          placeholder="luc.jonkers.eth"
          onChange={(e) => setUserAlias(e.target.value)}
          value={userAlias}
        />
        <Text id="modal-title" b size={18}>
          Profile Picture NFT:
        </Text>
        <Input
          type="file"
          placeholder="https://opensea.io/assets/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/28001145"
          onChange={(e) => setUserPicture(e.target.files)}
        />
        <Text id="modal-title" b size={18}>
          Website:
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
        <Text id="modal-title" b size={18}>
          On-Chain Experience:
        </Text>
        <Input
          placeholder="Web3 Consulting: 2016-2018

          Maker DAO: 2018-Present
          
          Curve DAO: 2019-Present
          
          0x DAO: 2021-Present"
          onChange={(e) => setUserOnChainExperience(e.target.value)}
          value={userOnChainExperience}
        />
        <Text id="modal-title" b size={18}>
          Off-Chain Experience:
        </Text>
        <Input
          placeholder="Fontys: 2004-2008

          IT Systems BV: 2008-2009
          
          Facebook: 2010-2012
          
          IBM: 2012-2016"
          onChange={(e) => setUserOffChainExperience(e.target.value)}
          value={userOffChainExperience}
        />
        <Text id="modal-title" b size={18}>
          Credentials:
        </Text>
        <Input
          placeholder="Bachelor's of Software Engineering"
          onChange={(e) => setUserCredentials(e.target.value)}
          value={userCredentials}
        />
        <Text id="modal-title" b size={18}>
          About you:
        </Text>
        <Input
          placeholder="Bachelor's of Software Engineering"
          onChange={(e) => setUserAbout(e.target.value)}
          value={userAbout}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={props.onClose}>
          Cancel
        </Button>
        <Button auto onClick={upload}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreateUser;
