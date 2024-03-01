import { encrypt } from "@metamask/eth-sig-util";
import { useMutation } from "@tanstack/react-query";
import { Address, parseEther } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";

import { contractAddresses, DemoProject } from "contracts";

import { queryClient } from "@/queryClient";

export function useMintBasedHam() {
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

      console.log({
        publicKey: "mtrHp1WHZM9rxF2Ilot9Hie5XmQcKCf7oDQ1DpGkTSI=",
        data: orderFields,
        version: "x25519-xsalsa20-poly1305",
      });

      const encryptedFields = encrypt({
        publicKey: "mtrHp1WHZM9rxF2Ilot9Hie5XmQcKCf7oDQ1DpGkTSI=",
        data: orderFields,
        version: "x25519-xsalsa20-poly1305",
      });

      const { request } = await publicClient.simulateContract({
        address: contractAddresses.localhost.DemoProject,
        abi: DemoProject,
        functionName: "mint",
        args: [JSON.stringify(encryptedFields) as Address],
        value: parseEther("0.01"),
      });

      const txHash = await walletClient.data?.writeContract(request);

      await publicClient.waitForTransactionReceipt({ hash: txHash! });
      queryClient.invalidateQueries();
    },
  });
}
