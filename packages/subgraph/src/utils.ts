import { ByteArray, Bytes } from "@graphprotocol/graph-ts";

export function createEntityId(entity: string, id: string): Bytes {
  const byteArray = ByteArray.fromUTF8(entity.concat("-").concat(id));
  return Bytes.fromByteArray(byteArray);
}