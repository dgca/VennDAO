import { createEntityId } from "./utils";
import {
  Product,
} from "../generated/schema";
import {
  ProductCreated as ProductCreatedEvent,
} from "../generated/VennDAOProducts/VennDAOProducts";


export function handleProductCreated(event: ProductCreatedEvent): void {
  const entity = new Product(
    createEntityId("Product", event.params.id.toHexString()),
  );
  entity.productId = event.params.id;
  entity.active = event.params.active;
  entity.name = event.params.name;
  entity.description = event.params.description;
  entity.price = event.params.price;
  entity.minOrderQuantity = event.params.minOrderQuantity;
  entity.maxOrderQuantity = event.params.maxOrderQuantity;
  entity.vendorTokenId = event.params.vendorTokenId;
  entity.publicFields = event.params.publicFields;
  entity.encryptedFields = event.params.encryptedFields;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
