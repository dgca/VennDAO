# VennDAO

VennDAO is a network of vendors that provide products and services to other web3 projects entirely onchain.

## Vendors and products

What is a vendor? What is a product or service? Let's use some examples to illustrate:

- Alice owns a print shop where she makes custom prints of any design a client provides. She joins VennDAO, adds her print service, and now a new NFT project can send their NFT holders a physical print of their NFT.
- Bob has a company that plants trees to offset carbon emissions. He joins VennDAO, lists his service, and now an environmentally conscious DAO can subimt a proposal to plant 100 trees.
- Carol is...you? What would you like to offer onchain? Join the DAO and get a whole new revenue stream.

## Placing orders from our vendor network

Customers can place orders from our vendors via a simple smart contract transaction. The order is placed onchain, and sent to the vendor for fulfillment.

Any sensitive information such as shipping addresses or email addresses are fully encrypted and only the vendor can decrypt them.

## Getting started

1. Clone this repo
2. Run `npm install`

## Running the project locally

- Start a local Hardhat node: `npx nx node contracts`
- Deploy contracts: `nx hardhat contracts -- run --network localhost scripts/deploy.ts`
- Run the frontend: `nx dev frontend`
