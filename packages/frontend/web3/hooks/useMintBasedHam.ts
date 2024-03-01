import { encrypt } from "@metamask/eth-sig-util";
import { useMutation } from "@tanstack/react-query";
import { Address, parseEther } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";

import { DemoProject } from "contracts";

import { getContractAddresses } from "../getContractAddresses";

import { queryClient } from "@/queryClient";

const contractAddresses = getContractAddresses();

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

      console.log(encryptedFields);

      try {
        const txHash = await walletClient.data?.writeContract({
          account: walletClient.data?.account,
          address: contractAddresses.DemoProject,
          abi: DemoProject,
          functionName: "mint",
          args: [JSON.stringify(encryptedFields) as Address],
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
