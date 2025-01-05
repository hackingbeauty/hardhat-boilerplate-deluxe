require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("@nomicfoundation/hardhat-verify");
require("hardhat-contract-sizer");
require("dotenv").config();

const {
  ALCHEMY_API_URL,
  COINMARKETCAP_API_KEY,
  ETHERSCAN_API_KEY,
  METAMASK_PRIVATE_KEY,
  REPORT_GAS,
} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    },
    sepolia: {
      url: ALCHEMY_API_URL,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`]
    }
  },
  gasReporter: {
    enabled: REPORT_GAS === "true" ? true : false,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY
  },  
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true
  }
};
