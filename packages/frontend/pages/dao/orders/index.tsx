import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { useWalletClient } from "wagmi";

import { Button, Card, Text } from "ui-kit";

import { DaoLayout } from "@/components/Layouts/DaoLayout";
import { decryptFields } from "@/utils/decryptFields";
import { useContracts } from "@/web3/WagmiContractsProvider";

const query = gql`
  query Orders($member: Bytes) {
    vendors(where: { member: $member }) {
      tokenId
      products {
        name
        orders {
          orderId
          quantity
          orderTotal
          status
          publicFields
          encryptedFields
        }
      }
    }
  }
`;

export default function Orders() {
  const walletClient = useWalletClient();
  const contracts = useContracts();

  const orders = contracts.VennDAOOrders().getOrders.useRead();

  const { data: ordersData } = useQuery({
    queryKey: ["orders", walletClient.data?.account.address],
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

  console.log(ordersData);

  return (
    <DaoLayout>
      <Text.H2 as="h1" className="leading-relaxed">
        Orders
      </Text.H2>
      {orders.data?.map(
        ({
          orderId,
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
            <Card key={Number(orderId)}>
              <pre>
                {JSON.stringify(
                  {
                    id: Number(orderId),
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
                  contracts.VennDAOOrders().updateOrderStatus(orderId, 1);
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
