import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

import { Card, Text, Badge } from "ui-kit";

import { MainLayout } from "@/components/Layouts/MainLayout";
import { graphql } from "@/gql";
import { useContracts } from "@/web3/WagmiContractsProvider";

const query = graphql(`
  query VendorsIncludeProducts {
    vendors {
      name
      website
      description
      products(where: { active: true }) {
        productId
        productId
        active
        name
        description
        price
        minOrderQuantity
        maxOrderQuantity
        publicFields
        encryptedFields
      }
    }
  }
`);

export default function Vendors() {
  const contracts = useContracts();
  const account = useAccount();

  const { data: ordersData } = useQuery({
    queryKey: ["VendorsIncludeProducts"],
    queryFn: async () => {
      const data = await request(
        "https://api.studio.thegraph.com/query/67001/venndao-sepolia/version/latest",
        query,
      );
      return data;
    },
  });

  const userVendorTokens = contracts
    .VennDAOVendors()
    .getAllTokensByOwner.useRead({
      args: [account.address!],
      query: {
        enabled: !!account.address,
      },
    });

  const vendorTokenId = userVendorTokens.data?.at(0);
  const hasVendorTokenId = typeof vendorTokenId === "bigint";

  const vendorProducts = contracts
    .VennDAOProducts()
    .getProductsByVendorId.useRead({
      args: [vendorTokenId!],
      query: {
        enabled: hasVendorTokenId,
      },
    });

  if (!hasVendorTokenId) return null;

  return (
    <MainLayout>
      <div className="container px-4 py-12 max-w-2xl mx-auto">
        <Text.H2 as="h1">Browse Vendors</Text.H2>
        <Text.Plain as="p" className="my-4">
          Check out our vendors and the products they offer!
        </Text.Plain>
        {ordersData?.vendors.flatMap((vendor) => {
          return vendor.products.map(
            ({
              productId,
              name,
              price,
              minOrderQuantity,
              maxOrderQuantity,
              publicFields,
              encryptedFields,
              description,
            }) => (
              <Card className="py-4 px-6 w-full mb-6" key={productId}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Text.Large>{name}</Text.Large>
                    <Text.Muted>(id: {Number(productId)})</Text.Muted>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Text.Muted>Vendor:</Text.Muted>
                  <Text.Plain>{vendor.name}</Text.Plain>
                </div>
                <div className="flex items-center gap-2">
                  <Text.Muted>Website:</Text.Muted>
                  <Text.Plain>{vendor.website}</Text.Plain>
                </div>
                <div className="flex items-center gap-2">
                  <Text.Muted>Descrition:</Text.Muted>
                  <Text.Plain>{vendor.description}</Text.Plain>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="flex items-center gap-2">
                    <Text.Muted>Vendor:</Text.Muted>
                    <Text.Plain>{vendor.name}</Text.Plain>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text.Muted>Price:</Text.Muted>
                    <Text.Plain>{formatUnits(price, 6)} USDC</Text.Plain>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text.Muted>Min Order Quantity:</Text.Muted>
                    <Text.Plain>{Number(minOrderQuantity)}</Text.Plain>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text.Muted>Max Order Quantity:</Text.Muted>
                    <Text.Plain>{Number(maxOrderQuantity)}</Text.Plain>
                  </div>
                </div>
                {publicFields.length > 0 && (
                  <div className="mb-4">
                    <Text.Muted>Public fields:</Text.Muted>
                    <div className="flex gap-1">
                      {publicFields.map((field, i) => (
                        <Badge key={i} className="pointer-events-none">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {encryptedFields.length > 0 && (
                  <div className="mb-4">
                    <Text.Muted>Encrypted fields:</Text.Muted>
                    <div className="flex gap-1">
                      {encryptedFields.map((field, i) => (
                        <Badge
                          key={i}
                          className="pointer-events-none"
                          variant="destructive"
                        >
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <Text.Muted>Description:</Text.Muted>
                  <Text.Plain>{description}</Text.Plain>
                </div>
              </Card>
            ),
          );
        })}
        {vendorProducts.data?.length === 0 && (
          <Text.P>Huh, no one has added any products yet...</Text.P>
        )}
      </div>
    </MainLayout>
  );
}
