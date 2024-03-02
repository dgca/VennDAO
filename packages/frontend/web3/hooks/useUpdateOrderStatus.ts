import { useMutation } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";

import { useContracts } from "../WagmiContractsProvider";

import { queryClient } from "@/queryClient";

export type Steps = "pending" | "submitting" | "success" | "error";

export function useUpdateOrderStatus() {
  const contracts = useContracts();
  const publicClient = usePublicClient()!;

  return useMutation({
    mutationFn: async ({
      orderId,
      newStatus,
    }: {
      orderId: bigint;
      newStatus: number;
    }) => {
      const [hash] = await contracts
        .VennDAOOrders()
        .updateOrderStatus(orderId, newStatus);

      await publicClient.waitForTransactionReceipt({ hash });
      queryClient.invalidateQueries();
    },
  });
}
