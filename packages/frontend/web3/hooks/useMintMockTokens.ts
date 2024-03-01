import { useMutation } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";

import { useContracts } from "../WagmiContractsProvider";

import { queryClient } from "@/queryClient";

export function useMintMockTokens() {
  const contracts = useContracts();
  const publicClient = usePublicClient()!;

  return useMutation({
    mutationFn: async () => {
      const [txHash] = await contracts.MockUSDC().mint();
      await publicClient.waitForTransactionReceipt({ hash: txHash });
      queryClient.invalidateQueries();
    },
  });
}
