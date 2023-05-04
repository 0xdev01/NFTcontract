require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;
const RPC_Mumbai = process.env.RPC_Mumbai;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      blockGasLimit:100000000
    },
    goerli: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    mumbai: {
      url: RPC_Mumbai,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
    },
  },

  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: "72f2d44c-e975-45e0-8b46-9164a758016a",
    gasPrice: 30,
    outputFile: "gasreporter.txt",
    noColors: true,
  },

  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
  solidity: "0.8.19",
};