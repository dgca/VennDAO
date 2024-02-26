import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { parseUnits } from "viem";
import { usePublicClient } from "wagmi";

import { contractAddresses } from "contracts";

import { useContracts } from "../WagmiContractsProvider";

export type Steps = "pending" | "approve" | "join" | "success" | "error";

export function useJoinDao() {
  const contracts = useContracts();
  const publicClient = usePublicClient()!;
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
        .approve(
          contractAddresses.localhost.VennDAOVendors,
          parseUnits("50", 6),
        );
      await publicClient.waitForTransactionReceipt({ hash: approveHash });

      setStep("join");

      const [joinHash] = await contracts
        .VennDAOVendors()
        .joinDAO(name, website, description);

      await publicClient.waitForTransactionReceipt({ hash: joinHash });

      setStep("success");
    },
  });

  return {
    step,
    mutation,
  };
}
