require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require('hardhat-contract-sizer');
require('@openzeppelin/hardhat-upgrades');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    avaxTestnet: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: ["8dc49ef87f89dcad159144b5b571ec147b6eac2f602eeb69676c34cfc87bbc83"],
    },
  },
  solidity: "0.8.4",
};