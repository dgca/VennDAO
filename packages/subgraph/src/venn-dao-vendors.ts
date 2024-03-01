import {
  Approval,
  ApprovalForAll,
  DelegateChanged,
  DelegateVotesChanged,
  EIP712DomainChanged,
  MembershipFeeUpdated,
  Vendor,
  OrdersAddressUpdated,
  OwnershipTransferred,
  TokenBurned,
  Transfer,
} from "../generated/schema"
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  DelegateChanged as DelegateChangedEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
  EIP712DomainChanged as EIP712DomainChangedEvent,
  MembershipFeeUpdated as MembershipFeeUpdatedEvent,
  NewVendorMember as NewVendorMemberEvent,
  OrdersAddressUpdated as OrdersAddressUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TokenBurned as TokenBurnedEvent,
  Transfer as TransferEvent,
} from "../generated/VennDAOVendors/VennDAOVendors"

export function handleApproval(event: ApprovalEvent): void {
  const entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  const entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDelegateChanged(event: DelegateChangedEvent): void {
  const entity = new DelegateChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.delegator = event.params.delegator
  entity.fromDelegate = event.params.fromDelegate
  entity.toDelegate = event.params.toDelegate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDelegateVotesChanged(
  event: DelegateVotesChangedEvent,
): void {
  const entity = new DelegateVotesChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.delegate = event.params.delegate
  entity.previousVotes = event.params.previousVotes
  entity.newVotes = event.params.newVotes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent,
): void {
  const entity = new EIP712DomainChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMembershipFeeUpdated(
  event: MembershipFeeUpdatedEvent,
): void {
  const entity = new MembershipFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.newFee = event.params.newFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewVendorMember(event: NewVendorMemberEvent): void {
  const entity = new Vendor(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokenId = event.params.tokenId
  entity.member = event.params.member
  entity.name = event.params.name
  entity.description = event.params.description
  entity.website = event.params.website

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrdersAddressUpdated(
  event: OrdersAddressUpdatedEvent,
): void {
  const entity = new OrdersAddressUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.newOrdersAddress = event.params.newOrdersAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

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

export function handleTokenBurned(event: TokenBurnedEvent): void {
  const entity = new TokenBurned(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  const entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
