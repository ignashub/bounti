import {Moralis} from "moralis";


//Function to get saved info from ipfs
const getIpfsUser = async (address) => {
    const query = new Moralis.Query("Users");
    query.equalTo("walletAddress", address);
    const userMoralis = await query.first();
    const userCID = userMoralis.attributes.CID;
    const url = `https://gateway.moralisipfs.com/ipfs/${userCID}`;
    const response = await fetch(url);
    console.log(url);
    return response.json();
};

const updateUser = async (metadata, address) => {
    const file = new Moralis.File("file.json", {
        base64: btoa(JSON.stringify(metadata)),
    });

    await file.saveIPFS();

    const Users = Moralis.Object.extend("Users");
    const query = new Moralis.Query(Users);
    query.equalTo("walletAddress", address);
    const currentUser = await query.first();

    currentUser.set("CID", file.hash());
    currentUser.save();
}

const getAllUserDaos = async (userAddress) => {
    const userObject = await getIpfsUser(userAddress);
    console.log("This is all user's daos: ", userObject.daos)
    return userObject.daos;
}

export {getIpfsUser, updateUser, getAllUserDaos};