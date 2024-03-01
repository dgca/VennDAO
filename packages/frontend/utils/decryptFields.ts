import { Address } from "viem";

export function decryptFields(encryptedFields: string, address: Address) {
  return window.ethereum.request({
    method: "eth_decrypt",
    params: [encryptedFields, address],
  });
}
