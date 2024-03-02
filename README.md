# VennDAO

VennDAO is a network of vendors that provide products and services to web3 projects entirely onchain.

## Vendors and products

What is a vendor? What is a product or service? Let's use some examples to illustrate:

- Alice owns a print shop where she makes custom prints of any design a client provides. She joins VennDAO, adds her print service, and now a new NFT project can send their NFT holders a physical print of their NFT.
- Bob has a company that plants trees to offset carbon emissions. He joins VennDAO, lists his service, and now an environmentally conscious DAO can subimt a proposal to plant 100 trees.
- Carol is...you? What would you like to offer onchain? Join the DAO and get a whole new revenue stream.

## Placing orders from our vendor network

Customers can place orders from our vendors via a simple smart contract transaction. The order is placed onchain, and sent to the vendor for fulfillment.

Any sensitive information such as shipping addresses or email addresses are fully encrypted and only the vendor can decrypt them.

## Deployed addresses (Base Sepolia)

- VennDAOVendors
    - [0x291e234e6d21290ba4a17bd3f2fa2b63cdb7e711](https://sepolia.basescan.org/address/0x291e234e6d21290ba4a17bd3f2fa2b63cdb7e711)
- VennDAOProducts
    - [0x508a06bfa8a359392396b448dc93d11d3186ae11](https://sepolia.basescan.org/address/0x508a06bfa8a359392396b448dc93d11d3186ae11)
- VennDAOOrders
    - [0xac10cd66e3ab8d4cde540029123742353ad421a7](https://sepolia.basescan.org/address/0xac10cd66e3ab8d4cde540029123742353ad421a7)
- VennDAOGovernor
    - [0x4454a0c06a3e1ff8dcd216df5f14eee7f97f95eb](https://sepolia.basescan.org/address/0x4454a0c06a3e1ff8dcd216df5f14eee7f97f95eb)
- VennDAOTimelock
    - [0x7d6a40c829e810e6093949c530266d312b35f994](https://sepolia.basescan.org/address/0x7d6a40c829e810e6093949c530266d312b35f994)
- DemoProject
    - [0x0e37c7178d115acdfa3352f4e5ba246f2af0651a](https://sepolia.basescan.org/address/0x0e37c7178d115acdfa3352f4e5ba246f2af0651a)

## Getting started

1. Clone this repo
2. Run `npm install`

## Running the project locally

- Start a local Hardhat node: `npx nx node contracts`
- Deploy contracts: `nx hardhat contracts -- run --network localhost scripts/deploy.ts`
- Build contracts: `nx build contracts`
- Run the frontend: `nx dev frontend`

## Tech used (non-exhaustive list)

- Hardhat
- OpenZeppelin Contracts
- Rainbowkit
- Next.js
- Wagmi/Viem
- shadcn/ui

To-do
- The Graph
- Deploy to Base
- Bridging via wormhole?
- EthStorage?