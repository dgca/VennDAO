import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Address, parseUnits } from "viem";
import { useAccount, usePublicClient } from "wagmi";

import { getContractAddresses } from "../getContractAddresses";
import { useContracts } from "../WagmiContractsProvider";

export type Steps = "pending" | "approve" | "join" | "success" | "error";

async function getEncryptionPublicKey(address: Address) {
  const result = await window.ethereum.request({
    method: "eth_getEncryptionPublicKey",
    params: [address],
  });
  if (typeof result !== "string") {
    throw new Error("Invalid encryption public key");
  }
  return result;
}

const contractAddresses = getContractAddresses();

export function useJoinDao() {
  const contracts = useContracts();
  const publicClient = usePublicClient()!;
  const userAccount = useAccount();

  const [step, setStep] = useState<Steps>("pending");

  const mutation = useMutation({
    mutationFn: async ({
      name,
      website,
      description,
    }: {
      name: string;
      website: string;
      description: string;
    }) => {
      setStep("approve");

      const [approveHash] = await contracts
        .MockUSDC()
        .approve(contractAddresses.VennDAOVendors, parseUnits("50", 6));
      await publicClient.waitForTransactionReceipt({ hash: approveHash });

      const encryptionKey = await getEncryptionPublicKey(userAccount.address!);

      setStep("join");

      const [joinHash] = await contracts
        .VennDAOVendors()
        .joinDAO(name, website, description, encryptionKey);

      await publicClient.waitForTransactionReceipt({ hash: joinHash });

      setStep("success");
    },
  });

  return {
    step,
    mutation,
  };
}
