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
  const { data: vendorProductsData } = useQuery({
    queryKey: ["VendorsIncludeProducts"],
    queryFn: async () => {
      const data = await request(
        "https://api.studio.thegraph.com/query/67001/venndao-sepolia/version/latest",
        query,
      );
      return data;
    },
  });

  const hasProducts = vendorProductsData?.vendors.some(
    (vendor) => vendor.products.length > 0,
  );

  return (
    <MainLayout>
      <div className="container px-4 py-12 max-w-2xl mx-auto">
        <Text.H2 as="h1">Browse Vendors</Text.H2>
        <Text.Plain as="p" className="my-4">
          Check out our vendors and the products they offer 👇
        </Text.Plain>
        {vendorProductsData?.vendors.map((vendor, i) => {
          return (
            <div className="w-full mb-8 border-b border-muted" key={i}>
              <div className="flex flex-col mb-4">
                <div className="flex gap-2 items-center">
                  <Text.Large>{vendor.name}</Text.Large>
                  <Text.Muted>{vendor.description}</Text.Muted>
                </div>
                <Text.Plain>{vendor.website}</Text.Plain>
              </div>
              {vendor.products.map((product) => (
                <Card
                  className="py-4 px-6 w-full mb-10"
                  key={product.productId}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Text.Large>{product.name}</Text.Large>
                      <Text.Muted>(id: {Number(product.productId)})</Text.Muted>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 my-2">
                    <div className="flex items-center gap-2">
                      <Text.Muted>Min Order Quantity:</Text.Muted>
                      <Text.Plain>
                        {Number(product.minOrderQuantity)}
                      </Text.Plain>
                    </div>
                    <div className="flex items-center gap-2">
                      <Text.Muted>Max Order Quantity:</Text.Muted>
                      <Text.Plain>
                        {Number(product.maxOrderQuantity)}
                      </Text.Plain>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text.Muted>Price:</Text.Muted>
                    <Text.Plain>
                      {formatUnits(product.price, 6)} USDC
                    </Text.Plain>
                  </div>
                  <div className="my-2">
                    <Text.Muted>Description:</Text.Muted>
                    <Text.Plain>{product.description}</Text.Plain>
                  </div>
                  {product.publicFields.length > 0 && (
                    <div className="mb-4">
                      <Text.Muted>Public fields:</Text.Muted>
                      <div className="flex gap-1">
                        {product.publicFields.map((field, i) => (
                          <Badge key={i} className="pointer-events-none">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.encryptedFields.length > 0 && (
                    <div className="mb-4">
                      <Text.Muted>Encrypted fields:</Text.Muted>
                      <div className="flex gap-1">
                        {product.encryptedFields.map((field, i) => (
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
                </Card>
              ))}
            </div>
          );
        })}
        {!hasProducts && (
          <Text.P>Huh, no one has added any products yet...</Text.P>
        )}
      </div>
    </MainLayout>
  );
}
