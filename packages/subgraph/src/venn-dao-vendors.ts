import { createEntityId } from "./utils"
import {
  Vendor,
} from "../generated/schema"
import {
  NewVendorMember as NewVendorMemberEvent,
} from "../generated/VennDAOVendors/VennDAOVendors"

export function handleNewVendorMember(event: NewVendorMemberEvent): void {
  const entity = new Vendor(
    createEntityId("Vendor", event.params.tokenId.toHexString())
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
