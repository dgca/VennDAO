import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

function getNetworks() {
  console.log(process.env.TESTNET_PK, process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);
  if (process.env.TESTNET_PK) {
    return {
      sepolia: {
        url: `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
        accounts: [process.env.TESTNET_PK],
        gasPrice: 1000000000,
      },
    };
  }
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      // Change this to "paris" if your target chain does not support PUSH0
      evmVersion: "shanghai",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: getNetworks(),
  paths: {
    sources: "./src",
  },
};

export default config;
