/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { useWalletClient } from "wagmi";

import { Text } from "ui-kit";

import { DaoLayout } from "@/components/Layouts/DaoLayout";
import { VendorOrderCard } from "@/components/VendorOrderCard/VendorOrderCard";
import { graphql } from "@/gql";

const query = graphql(`
  query OrdersByMember($member: Bytes) {
    vendors(where: { member: $member }) {
      tokenId
      products {
        name
        publicFields
        encryptedFields
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
`);

export default function Orders() {
  const walletClient = useWalletClient();

  const { data: ordersData } = useQuery({
    queryKey: ["OrdersByMember", walletClient.data?.account.address],
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

  const ordersContent = ordersData?.vendors.flatMap((vendor) => {
    return vendor.products.flatMap((product) => {
      return product.orders.map((order) => (
        <VendorOrderCard
          key={order.orderId}
          orderId={order.orderId}
          productName={product.name}
          status={order.status}
          quantity={order.quantity}
          orderTotal={order.orderTotal}
          publicFields={product.publicFields}
          publicFieldValues={order.publicFields}
          encryptedFields={product.encryptedFields}
          encryptedFieldsData={order.encryptedFields}
        />
      ));
    });
  });

  return (
    <DaoLayout>
      <Text.H2 as="h1" className="leading-relaxed">
        Orders
      </Text.H2>
      {!ordersContent?.length && (
        <Text.Muted className="mt-4 text-center">
          No orders found for your account
        </Text.Muted>
      )}
      {ordersContent}
    </DaoLayout>
  );
}
