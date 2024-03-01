import { createEntityId } from "./utils"
import {
  OwnershipTransferred,
  ProductActiveStatusChanged,
  Product,
} from "../generated/schema"
import {
  OwnershipTransferred as OwnershipTransferredEvent,
  ProductActiveStatusChanged as ProductActiveStatusChangedEvent,
  ProductCreated as ProductCreatedEvent,
} from "../generated/VennDAOProducts/VennDAOProducts"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  const entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProductActiveStatusChanged(
  event: ProductActiveStatusChangedEvent,
): void {
  const entity = new ProductActiveStatusChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.VennDAOProducts_id = event.params.id
  entity.active = event.params.active

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProductCreated(event: ProductCreatedEvent): void {
  const entity = new Product(
    createEntityId("Product", event.params.id.toHexString()),
  )
  entity.VennDAOProducts_id = event.params.id
  entity.active = event.params.active
  entity.name = event.params.name
  entity.description = event.params.description
  entity.price = event.params.price
  entity.minOrderQuantity = event.params.minOrderQuantity
  entity.maxOrderQuantity = event.params.maxOrderQuantity
  entity.vendorTokenId = event.params.vendorTokenId
  entity.publicFields = event.params.publicFields
  entity.encryptedFields = event.params.encryptedFields

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
