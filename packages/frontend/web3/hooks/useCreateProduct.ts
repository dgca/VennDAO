import { useMutation } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";

import { useContracts } from "../WagmiContractsProvider";

import { queryClient } from "@/queryClient";

export type Steps = "pending" | "submitting" | "success" | "error";

export function useCreateProduct() {
  const contracts = useContracts();
  const publicClient = usePublicClient()!;

  type CreateProductsArgs = Parameters<
    ReturnType<typeof contracts.VennDAOProducts>["createProduct"]
  >;

  return useMutation({
    mutationFn: async (args: CreateProductsArgs) => {
      const [addProductHash] = await contracts
        .VennDAOProducts()
        .createProduct(...args);

      await publicClient.waitForTransactionReceipt({ hash: addProductHash });
      queryClient.invalidateQueries();
    },
  });
}
