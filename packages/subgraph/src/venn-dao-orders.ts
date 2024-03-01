import { createEntityId } from "./utils";
import {
  Order,
} from "../generated/schema";
import {
  OrderPlaced as OrderPlacedEvent,
  OrderStatusUpdated as OrderStatusUpdatedEvent,
} from "../generated/VennDAOOrders/VennDAOOrders";

export function handleOrderPlaced(event: OrderPlacedEvent): void {
  const entity = new Order(
    createEntityId("Order", event.params.orderId.toHexString()),
  );
  entity.orderId = event.params.orderId;
  entity.productId = event.params.productId;
  entity.placedBy = event.params.placedBy;
  entity.quantity = event.params.quantity;
  entity.refundRecipient = event.params.refundRecipient;
  entity.orderTotal = event.params.orderTotal;
  entity.status = event.params.status;
  entity.createdAt = event.params.createdAt;
  entity.publicFields = event.params.publicFields;
  entity.encryptedFields = event.params.encryptedFields;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.product = createEntityId(
    "Product",
    event.params.productId.toHexString(),
  );

  entity.save();
}

export function handleOrderStatusUpdated(event: OrderStatusUpdatedEvent): void {
  const entity = Order.load(createEntityId("Order", event.params.orderId.toHexString()))!;
  entity.status = event.params.newStatus;
  entity.save();
}
