import { Text } from "ui-kit";

import { DaoLayout } from "@/components/Layouts/DaoLayout";

export default function Orders() {
  return (
    <DaoLayout>
      <div className="container px-4 py-12 mx-auto">
        <Text.H2 as="h1" className="leading-relaxed">
          Proposals
        </Text.H2>
      </div>
    </DaoLayout>
  );
}
