import hre from "hardhat";
import { Address } from "viem";

import { updateContractAddresses } from "../lib/update-contract-addresses";

function getUSDCAddress() {
  const address: Address | undefined = (
    {
      localhost: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // @todo: Deploy a local USDC contract
      sepolia: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    } as const
  )[hre.network.name];

  if (!address) {
    throw new Error("USDC address not found for network");
  }

  return address;
}

async function deployVendors({
  initialOwner,
  usdcAddress,
}: {
  initialOwner: Address;
  usdcAddress: Address;
}) {
  const vendors = await hre.viem.deployContract("VennDAOVendors", [
    initialOwner,
    usdcAddress,
  ]);
  console.log(`Vendors deployed to ${vendors.address}`);
  return vendors;
}

async function deployTimelock(tempAdmin: Address) {
  // @ts-expect-error Unsure why viem is not inferring the right contract here
  const timelock = await hre.viem.deployContract("VennDAOTimelock", [
    24 * 60 * 60 * 2, // 2 days
    [],
    [],
    tempAdmin,
  ]);
  console.log(`Timelock deployed to ${timelock.address}`);
  return timelock;
}

async function deployGovernor({
  vendorsAddress,
  timelockAddress,
}: {
  vendorsAddress: Address;
  timelockAddress: Address;
}) {
  const governor = await hre.viem.deployContract("VennDAOGovernor", [
    vendorsAddress,
    timelockAddress,
  ]);
  console.log(`Governor deployed to ${governor.address}`);
  return governor;
}

async function deployProducts({
  vendorsAddress,
  timelockAddress,
}: {
  vendorsAddress: Address;
  timelockAddress: Address;
}) {
  const products = await hre.viem.deployContract("VennDAOProducts", [
    vendorsAddress,
    timelockAddress,
  ]);
  console.log(`Products deployed to ${products.address}`);
  return products;
}

async function deployOrders({
  productsAddress,
  vendorsAddress,
  timelockAddress,
}: {
  productsAddress: Address;
  vendorsAddress: Address;
  timelockAddress: Address;
}) {
  const orders = await hre.viem.deployContract("VennDAOOrders", [
    productsAddress,
    vendorsAddress,
    timelockAddress,
  ]);
  console.log(`Orders deployed to ${orders.address}`);
  return orders;
}

async function main() {
  const publicClient = await hre.viem.getPublicClient();
  const [deployerClient] = await hre.viem.getWalletClients();

  const usdcAddress = getUSDCAddress();

  const vendorsContract = await deployVendors({
    initialOwner: deployerClient.account.address,
    usdcAddress: usdcAddress,
  });

  const timelockContract = await deployTimelock(deployerClient.account.address);

  const governorContract = await deployGovernor({
    vendorsAddress: vendorsContract.address,
    timelockAddress: timelockContract.address,
  });

  const PROPOSER_ROLE = await publicClient.readContract({
    abi: [
      {
        inputs: [],
        name: "PROPOSER_ROLE",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    address: timelockContract.address,
    functionName: "PROPOSER_ROLE",
  });

  const DEFAULT_ADMIN_ROLE = await publicClient.readContract({
    abi: [
      {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    address: timelockContract.address,
    functionName: "DEFAULT_ADMIN_ROLE",
  });

  await deployerClient.writeContract({
    abi: timelockContract.abi,
    address: timelockContract.address,
    functionName: "grantRole",
    args: [PROPOSER_ROLE, governorContract.address],
  });

  await deployerClient.writeContract({
    abi: timelockContract.abi,
    address: timelockContract.address,
    functionName: "renounceRole",
    args: [DEFAULT_ADMIN_ROLE, deployerClient.account.address],
  });

  const productsContract = await deployProducts({
    vendorsAddress: vendorsContract.address,
    timelockAddress: timelockContract.address,
  });

  const ordersContract = await deployOrders({
    productsAddress: productsContract.address,
    vendorsAddress: vendorsContract.address,
    timelockAddress: timelockContract.address,
  });

  if (hre.network.name === "localhost") {
    updateContractAddresses("localhost", {
      VennDAOVendors: vendorsContract.address,
      VennDAOTimelock: timelockContract.address,
      VennDAOGovernor: governorContract.address,
      VennDAOProducts: productsContract.address,
      VennDAOOrders: ordersContract.address,
    });
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
