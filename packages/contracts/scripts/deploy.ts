import hre from "hardhat";
import { Address } from "viem";

import { updateContractAddresses } from "../lib/update-contract-addresses";

function delay(ms = 4000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function deployMockUSDC() {
  const usdc = await hre.viem.deployContract("MockUSDC", []);
  console.log(`MockUSDC deployed to ${usdc.address}`);
  await delay();
  return usdc;
}

async function deployVendors({
  initialOwner,
  usdcAddress,
  treasuryAddress,
}: {
  initialOwner: Address;
  usdcAddress: Address;
  treasuryAddress: Address;
}) {
  const vendors = await hre.viem.deployContract("VennDAOVendors", [
    initialOwner,
    usdcAddress,
    treasuryAddress,
  ]);
  console.log(`Vendors deployed to ${vendors.address}`);
  await delay();
  await hre.run("verify:verify", {
    address: vendors.address,
    constructorArguments: [initialOwner, usdcAddress, treasuryAddress],
    contract: "src/VennDAOVendors.sol:VennDAOVendors",
  });
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
  await delay();
  await hre.run("verify:verify", {
    address: timelock.address,
    constructorArguments: [24 * 60 * 60 * 2, [], [], tempAdmin],
    contract: "src/VennDAOTimelock.sol:VennDAOTimelock",
  });
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
  await delay();
  await hre.run("verify:verify", {
    address: governor.address,
    constructorArguments: [vendorsAddress, timelockAddress],
    contract: "src/VennDAOGovernor.sol:VennDAOGovernor",
  });
  return governor;
}

async function deployProducts({
  vendorsAddress,
  ownerAddress,
}: {
  vendorsAddress: Address;
  ownerAddress: Address;
}) {
  const products = await hre.viem.deployContract("VennDAOProducts", [
    vendorsAddress,
    ownerAddress,
  ]);
  console.log(`Products deployed to ${products.address}`);
  await delay();
  await hre.run("verify:verify", {
    address: products.address,
    constructorArguments: [vendorsAddress, ownerAddress],
    contract: "src/VennDAOProducts.sol:VennDAOProducts",
  });
  return products;
}

async function deployOrders({
  productsAddress,
  vendorsAddress,
  ownerAddress,
}: {
  productsAddress: Address;
  vendorsAddress: Address;
  ownerAddress: Address;
}) {
  const orders = await hre.viem.deployContract("VennDAOOrders", [
    productsAddress,
    vendorsAddress,
    ownerAddress,
  ]);
  console.log(`Orders deployed to ${orders.address}`);
  await delay();
  await hre.run("verify:verify", {
    address: orders.address,
    constructorArguments: [productsAddress, vendorsAddress, ownerAddress],
    contract: "src/VennDAOOrders.sol:VennDAOOrders",
  });
  return orders;
}

async function deployBasedHams({
  initialOrder,
  ordersAddress,
  usdcAddress,
}: {
  initialOrder: Address;
  ordersAddress: Address;
  usdcAddress: Address;
}) {
  const basedHams = await hre.viem.deployContract("DemoProject", [
    initialOrder,
    ordersAddress,
    usdcAddress,
  ]);
  console.log(`BasedHams deployed to ${basedHams.address}`);
  await delay();
  return basedHams;
}

async function main() {
  const publicClient = await hre.viem.getPublicClient();
  const [deployerClient] = await hre.viem.getWalletClients();

  const mockUSDC = await deployMockUSDC();
  const usdcAddress = mockUSDC.address;

  const timelockContract = await deployTimelock(deployerClient.account.address);

  const vendorsContract = await deployVendors({
    initialOwner: deployerClient.account.address,
    usdcAddress: usdcAddress,
    treasuryAddress: timelockContract.address,
  });

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

  await delay();

  await deployerClient.writeContract({
    abi: timelockContract.abi,
    address: timelockContract.address,
    functionName: "renounceRole",
    args: [DEFAULT_ADMIN_ROLE, deployerClient.account.address],
  });

  await delay();

  const productsContract = await deployProducts({
    vendorsAddress: vendorsContract.address,
    ownerAddress: timelockContract.address,
  });

  const ordersContract = await deployOrders({
    productsAddress: productsContract.address,
    vendorsAddress: vendorsContract.address,
    ownerAddress: timelockContract.address,
  });

  await deployerClient.writeContract({
    abi: vendorsContract.abi,
    address: vendorsContract.address,
    functionName: "setOrdersAddress",
    args: [ordersContract.address],
  });

  await delay();

  await deployerClient.writeContract({
    abi: vendorsContract.abi,
    address: vendorsContract.address,
    functionName: "transferOwnership",
    args: [timelockContract.address],
  });

  await delay();

  const demoProject = await deployBasedHams({
    initialOrder: deployerClient.account.address,
    ordersAddress: ordersContract.address,
    usdcAddress: usdcAddress,
  });

  await deployerClient.writeContract({
    abi: mockUSDC!.abi,
    address: usdcAddress,
    functionName: "mintTo",
    args: [demoProject.address],
  });

  if (hre.network.name === "localhost" || hre.network.name === "sepolia") {
    updateContractAddresses(hre.network.name, {
      MockUSDC: usdcAddress,
      DemoProject: demoProject.address,
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
