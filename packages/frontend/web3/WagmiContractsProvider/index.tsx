import { initUseWagmiContracts } from "@type_of/use-wagmi-contracts";
import { abis } from "contracts";

import { getContractAddresses } from "../getContractAddresses";

const contractAddresses = getContractAddresses();

const { WagmiContractsProvider, useContracts } = initUseWagmiContracts({
  VennDAOVendors: {
    abi: abis.VennDAOVendors,
    defaultAddress: contractAddresses.VennDAOVendors,
  },
  VennDAOTimelock: {
    abi: abis.VennDAOTimelock,
    defaultAddress: contractAddresses.VennDAOTimelock,
  },
  VennDAOGovernor: {
    abi: abis.VennDAOGovernor,
    defaultAddress: contractAddresses.VennDAOGovernor,
  },
  VennDAOProducts: {
    abi: abis.VennDAOProducts,
    defaultAddress: contractAddresses.VennDAOProducts,
  },
  VennDAOOrders: {
    abi: abis.VennDAOOrders,
    defaultAddress: contractAddresses.VennDAOOrders,
  },
  MockUSDC: {
    abi: abis.MockUSDC,
    defaultAddress: contractAddresses.MockUSDC,
  },
  DemoProject: {
    abi: abis.DemoProject,
    defaultAddress: contractAddresses.DemoProject,
  },
});

export { WagmiContractsProvider, useContracts };
