import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

function getNetworks() {
  if (process.env.TESTNET_PK) {
    return {
      sepolia: {
        url: `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
        accounts: [process.env.TESTNET_PK],
        gasPrice: 1000000000,
        verify: {
          etherscan: {
            apiUrl: "https://api-sepolia.basescan.org",
            apiKey: process.env.ETHERSCAN_API_KEY,
          },
        },
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
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  },
  paths: {
    sources: "./src",
  },
};

export default config;
