const {ethers, upgrades} = require("hardhat");

async function main() {

    const TaskManager = await ethers.getContractFactory("TaskManager");
    const MemberManager = await ethers.getContractFactory("TaskMemberManager");

    await upgrades.upgradeProxy('0xF6A81a3C1FA3b42534379F321F4F01242Ec630C5', TaskManager);
    await upgrades.upgradeProxy('0x06CAE1a6500872379E419Ab4267c38a9Db78d5d0', MemberManager);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });