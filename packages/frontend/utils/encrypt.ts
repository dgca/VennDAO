/* eslint-disable import/namespace */
import * as nacl from "tweetnacl";
import * as naclUtil from "tweetnacl-util";

export type EthEncryptedData = {
  version: string;
  nonce: string;
  ephemPublicKey: string;
  ciphertext: string;
};

export function encrypt({
  publicKey,
  data,
}: {
  publicKey: string;
  data: string;
}): EthEncryptedData {
  const ephemeralKeyPair = nacl.box.keyPair();

  let publicKeyUInt8Array: Uint8Array;

  try {
    publicKeyUInt8Array = naclUtil.decodeBase64(publicKey);
  } catch (err) {
    throw new Error(`Invalid public key: ${publicKey}`);
  }

  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const encryptedMessage = nacl.box(
    naclUtil.decodeUTF8(data),
    nonce,
    publicKeyUInt8Array,
    ephemeralKeyPair.secretKey,
  );

  return {
    version: "x25519-xsalsa20-poly1305",
    nonce: naclUtil.encodeBase64(nonce),
    ephemPublicKey: naclUtil.encodeBase64(ephemeralKeyPair.publicKey),
    ciphertext: naclUtil.encodeBase64(encryptedMessage),
  };
}
