require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");
require("hardhat-gas-reporter");
require('dotenv').config();

const {
  REPORT_GAS,
  COINMARKETCAP_API_KEY
} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    }
  },
  gasReporter: {
    enabled: REPORT_GAS === "true" ? true : false,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY
  }
};
