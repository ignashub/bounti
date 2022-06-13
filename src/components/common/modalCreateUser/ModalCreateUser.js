import React from "react";
import { Text, Button, Modal, Input, Checkbox, Radio } from "@nextui-org/react";

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

  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  const ethers = Moralis.web3Library;

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
    userObject.set("contractAddress", user.get("ethAddress"));
    console.log(file);
    await userObject.save();
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
    console.log(url);
    return response.json();
  };

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
          Let's Create your Profile:
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-title" b size={18}>
          Your Name:
        </Text>
        <Input placeholder="Luc Jonkers" />
        <Text id="modal-title" b size={18}>
          Your Alias/Discord/ENS:
        </Text>
        <Input labelLeft="username" placeholder="luc.jonkers.eth" />
        <Text id="modal-title" b size={18}>
          Your Profile Picture NFT:
        </Text>
        <Input placeholder="https://opensea.io/assets/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/28001145" />
        <Text id="modal-title" b size={18}>
          Your Website:
        </Text>
        <Input labelLeft="https://" placeholder="www.lucjonkers.com" />
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
        <Text id="modal-title" b size={18}>
          Set a Recovery Password:
        </Text>
        <Input.Password
          clearable
          color="warning"
          initialValue="password"
          type="password"
        />
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
