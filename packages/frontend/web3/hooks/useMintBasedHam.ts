import { useMutation } from "@tanstack/react-query";
import { Address, parseEther } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";

import { DemoProject } from "contracts";

import { getContractAddresses } from "../getContractAddresses";
import { useContracts } from "../WagmiContractsProvider";

import { queryClient } from "@/queryClient";
import { encrypt } from "@/utils/encrypt";

const contractAddresses = getContractAddresses();

export function useMintBasedHam() {
  const contracts = useContracts();
  const publicClient = usePublicClient()!;
  const walletClient = useWalletClient();

  return useMutation({
    mutationFn: async ({
      address,
      city,
      state,
      postalCode,
    }: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
    }) => {
      const orderFields = JSON.stringify([address, city, state, postalCode]);

      const productId = BigInt(1);

      const encryptionKey = await contracts
        .VennDAOProducts()
        .getEncryptionKeyByProductId(productId);

      const encryptedFields = encrypt({
        publicKey: encryptionKey,
        data: orderFields,
      });

      try {
        const txHash = await walletClient.data?.writeContract({
          account: walletClient.data?.account,
          address: contractAddresses.DemoProject,
          abi: DemoProject,
          functionName: "mint",
          args: [productId, JSON.stringify(encryptedFields) as Address],
          value: parseEther("0.01"),
        });

        await publicClient.waitForTransactionReceipt({ hash: txHash! });
        queryClient.invalidateQueries();
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  });
}
