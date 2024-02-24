import { Card, Text, Button } from "ui-kit";

import { DaoLayout } from "@/components/Layouts/DaoLayout";

export default function Orders() {
  const products = [];
  return (
    <DaoLayout>
      <div className="container px-4 py-12 mx-auto">
        <div className="flex justify-between">
          <Text.H2 as="h1" className="leading-relaxed">
            Products
          </Text.H2>
          <Button>Create</Button>
        </div>
        {products.length > -1 && (
          <Card className="py-4 px-6 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Text.Large>Crew Socks</Text.Large>
                <Text.Muted>(id: 123)</Text.Muted>
              </div>
              <Button>Edit</Button>
            </div>
            <div className="grid grid-cols-2 my-2">
              <div className="flex items-center gap-2">
                <Text.Muted>Price:</Text.Muted>
                <Text.Plain>20 USDC</Text.Plain>
              </div>
              <div className="flex items-center gap-2">
                <Text.Muted>Active:</Text.Muted>
                <Text.Plain>true</Text.Plain>
              </div>
              <div className="flex items-center gap-2">
                <Text.Muted>Min Order Quantity:</Text.Muted>
                <Text.Plain>1</Text.Plain>
              </div>
              <div className="flex items-center gap-2">
                <Text.Muted>Max Order Quantity:</Text.Muted>
                <Text.Plain>n/a</Text.Plain>
              </div>
            </div>
            <div>
              <Text.Muted>Description:</Text.Muted>
              <Text.Plain>
                Crew socks are shorter than knee-high socks, but longer than
                ankle socks. They typically come up to the mid-calf.
              </Text.Plain>
            </div>
          </Card>
        )}
        {products.length === 0 && (
          <Text.P>
            You don&apos;t have any products. Create one to get started.
          </Text.P>
        )}
      </div>
    </DaoLayout>
  );
}
