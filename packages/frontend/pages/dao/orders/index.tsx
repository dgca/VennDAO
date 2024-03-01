import { useWalletClient } from "wagmi";

import { Button, Card, Text } from "ui-kit";

import { DaoLayout } from "@/components/Layouts/DaoLayout";
import { decryptFields } from "@/utils/decryptFields";
import { useContracts } from "@/web3/WagmiContractsProvider";

export default function Orders() {
  const walletClient = useWalletClient();
  const contracts = useContracts();

  const orders = contracts.VennDAOOrders().getOrders.useRead();

  return (
    <DaoLayout>
      <Text.H2 as="h1" className="leading-relaxed">
        Orders
      </Text.H2>
      {orders.data?.map(
        ({
          id,
          productId,
          quantity,
          placedBy,
          refundRecipient,
          orderTotal,
          status,
          createdAt,
          publicFields,
          encryptedFields,
        }) => {
          return (
            <Card key={Number(id)}>
              <pre>
                {JSON.stringify(
                  {
                    id: Number(id),
                    productId: Number(productId),
                    quantity: Number(quantity),
                    placedBy,
                    refundRecipient,
                    orderTotal: Number(orderTotal),
                    status,
                    createdAt: Number(createdAt),
                    publicFields,
                    encryptedFields,
                  },
                  null,
                  2,
                )}
              </pre>
              <Button
                onClick={() => {
                  contracts.VennDAOOrders().updateOrderStatus(id, 1);
                }}
              >
                Accept Order
              </Button>
              <Button
                onClick={async () => {
                  const address = walletClient.data?.account.address;
                  if (!address) return;
                  console.log(encryptedFields);
                  const decryptedFields = await decryptFields(
                    encryptedFields,
                    address,
                  );
                  console.log(JSON.parse(decryptedFields));
                }}
              >
                Decrypt Fields
              </Button>
            </Card>
          );
        },
      )}
    </DaoLayout>
  );
}
