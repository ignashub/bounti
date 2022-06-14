const {Moralis} = require("moralis");

const ethers = Moralis.web3Library;

const contractAddress = "0x94c9805Eb10d93a64fA5c15D5f6f0B565782f7CC";
const contractABI = abi.abi;

const getBountiContract = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    return new ethers.Contract(contractAddress, contractABI, signer);
}