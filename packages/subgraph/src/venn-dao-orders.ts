import { Bytes } from "@graphprotocol/graph-ts"

import { createEntityId } from "./utils"
import {
  DaoFeeUpdated,
  OrderFundsTransferred,
  Order,
  OrderStatusUpdated,
  OwnershipTransferred,
  VendorRefundIssued,
  VennDAOOrdersInitialized
} from "../generated/schema"
import {
  DaoFeeUpdated as DaoFeeUpdatedEvent,
  OrderFundsTransferred as OrderFundsTransferredEvent,
  OrderPlaced as OrderPlacedEvent,
  OrderStatusUpdated as OrderStatusUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  VendorRefundIssued as VendorRefundIssuedEvent,
  VennDAOOrdersInitialized as VennDAOOrdersInitializedEvent
} from "../generated/VennDAOOrders/VennDAOOrders"

export function handleDaoFeeUpdated(event: DaoFeeUpdatedEvent): void {
  const entity = new DaoFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newFee = event.params.newFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderFundsTransferred(
  event: OrderFundsTransferredEvent
): void {
  const entity = new OrderFundsTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.orderId = event.params.orderId
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount
  entity.daoAmount = event.params.daoAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderPlaced(event: OrderPlacedEvent): void {
  const entity = new Order(
    createEntityId("Order", event.params.orderId.toHexString())
  )
  entity.orderId = event.params.orderId
  entity.productId = event.params.productId
  entity.placedBy = event.params.placedBy
  entity.quantity = event.params.quantity
  entity.refundRecipient = event.params.refundRecipient
  entity.orderTotal = event.params.orderTotal
  entity.status = event.params.status
  entity.createdAt = event.params.createdAt
  entity.publicFields = event.params.publicFields
  entity.encryptedFields = event.params.encryptedFields

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.product = createEntityId("Product", event.params.productId.toHexString())

  entity.save()
}

export function handleOrderStatusUpdated(event: OrderStatusUpdatedEvent): void {
  const entity = new OrderStatusUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.orderId = event.params.orderId
  entity.newStatus = event.params.newStatus

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  const entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVendorRefundIssued(event: VendorRefundIssuedEvent): void {
  const entity = new VendorRefundIssued(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.orderId = event.params.orderId
  entity.vendor = event.params.vendor
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVennDAOOrdersInitialized(
  event: VennDAOOrdersInitializedEvent
): void {
  const entity = new VennDAOOrdersInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.productsContract = event.params.productsContract
  entity.vendorsContract = event.params.vendorsContract
  entity.initialOwner = event.params.initialOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
