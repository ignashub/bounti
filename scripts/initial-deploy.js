const {ethers, upgrades} = require("hardhat");

async function main() {
    // We get the contract to deploy
    const factory1 = await ethers.getContractFactory("TaskManager");
    const factory2 = await ethers.getContractFactory("TaskMemberManager");
    const factory3 = await ethers.getContractFactory("Daos");
    // const factory4 = await ethers.getContractFactory("Proposals");
    // Deploying contracts using proxies
    const taskManager = await upgrades.deployProxy(factory1);
    const memberManager = await upgrades.deployProxy(factory2);
    const daos = await factory3.deploy();
    // const proposals = await factory4.deploy();

    await taskManager.deployed();
    await memberManager.deployed();
    await daos.deployed();
    // await proposals.deployed();


    console.log("TaskManager deployed to: ", taskManager.address);
    console.log("TaskMemberManager deployed to: ", memberManager.address);
    console.log("DAOs deployed to: ", daos.address);
    // console.log("Proposals deployed to: ", proposals.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });