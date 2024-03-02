import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { useToggle } from "usehooks-ts";
import { formatUnits } from "viem";
import { useAccount, useWalletClient } from "wagmi";

import { Card, Text, Button, Badge } from "ui-kit";

import { CreateProductModal } from "@/components/CreateProductModal/CreateProductModal";
import { DaoLayout } from "@/components/Layouts/DaoLayout";
import { graphql } from "@/gql";
import { useContracts } from "@/web3/WagmiContractsProvider";

const query = graphql(`
  query ProductsByMember($member: Bytes) {
    vendors(where: { member: $member }) {
      name
      products {
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

export default function Products() {
  const contracts = useContracts();
  const account = useAccount();
  const [isCreateModalOpen, toggleCreateModal] = useToggle();

  const walletClient = useWalletClient();

  const { data: ordersData } = useQuery({
    queryKey: ["ProductsByMember", walletClient.data?.account.address],
    queryFn: async () => {
      const data = await request(
        "https://api.studio.thegraph.com/query/67001/venndao-sepolia/version/latest",
        query,
        {
          member: walletClient.data?.account.address,
        },
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
    <>
      <DaoLayout>
        <div className="flex justify-between">
          <Text.H2 as="h1" className="leading-relaxed">
            Products
          </Text.H2>
          <Button onClick={toggleCreateModal}>Create</Button>
        </div>
        {ordersData?.vendors.flatMap((vendor) => {
          return vendor.products.map(
            ({
              productId,
              name,
              price,
              active,
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
                  <Button>Edit</Button>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="flex items-center gap-2">
                    <Text.Muted>Price:</Text.Muted>
                    <Text.Plain>{formatUnits(price, 6)} USDC</Text.Plain>
                  </div>
                  <div className="flex items-center gap-2">
                    <Text.Muted>Active:</Text.Muted>
                    <Text.Plain>{active.toString()}</Text.Plain>
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
          <Text.P>
            You don&apos;t have any products. Create one to get started.
          </Text.P>
        )}
      </DaoLayout>
      {isCreateModalOpen && (
        <CreateProductModal
          vendorTokenId={vendorTokenId}
          onClose={toggleCreateModal}
        />
      )}
    </>
  );
}
