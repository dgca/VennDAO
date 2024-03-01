import { useToggle } from "usehooks-ts";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

import { Card, Text, Button, Badge } from "ui-kit";

import { CreateProductModal } from "@/components/CreateProductModal/CreateProductModal";
import { DaoLayout } from "@/components/Layouts/DaoLayout";
import { useContracts } from "@/web3/WagmiContractsProvider";

export default function Products() {
  const contracts = useContracts();
  const account = useAccount();
  const [isCreateModalOpen, toggleCreateModal] = useToggle();

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
        {vendorProducts.data?.map(
          ({
            id,
            active,
            name,
            description,
            price,
            minOrderQuantity,
            maxOrderQuantity,
            publicFields,
            encryptedFields,
          }) => (
            <Card className="py-4 px-6 w-full mb-6" key={id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Text.Large>{name}</Text.Large>
                  <Text.Muted>(id: {Number(id)})</Text.Muted>
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
        )}
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
