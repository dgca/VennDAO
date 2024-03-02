import { Text } from "ui-kit";

import { MainLayout } from "@/components/Layouts/MainLayout";

export default function Products() {
  return (
    <MainLayout>
      <div className="container px-4 py-12 max-w-2xl mx-auto">
        <Text.H2 as="h1">About VennDAO</Text.H2>
        <Text.P>
          The idea for this project emerged from our frustration with the
          complexities of delivering real-world goods via a web3 app we are
          building outside of the hackathon.
        </Text.P>
        <Text.P>
          Few vendors of physical goods list their products on-chain. As a web3
          app, if you want to deliver real world goods to your customers, you
          typically have to build a custom integration with an existing web2
          APIs.
        </Text.P>
        <Text.P>
          VennDAO solves this problem by enabling any vendor to list their
          products on chain without having to deploy their own smart contract.
          Web3 apps can then place orders for products listed on VennDAO
          on-chain.
        </Text.P>
        <Text.P>
          Because VennDAO is a vendor-run organization, it offers vendors a
          unique advantage over traditional web2 marketplaces. This approach
          ensures that the interests of the vendors are at the forefront of the
          platform&apos;s development and governance.
        </Text.P>
      </div>
    </MainLayout>
  );
}
