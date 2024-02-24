import { Text } from "ui-kit";

import { DaoLayout } from "@/components/Layouts/DaoLayout";

export default function Orders() {
  return (
    <DaoLayout>
      <Text.H2 as="h1" className="leading-relaxed">
        Proposals
      </Text.H2>
    </DaoLayout>
  );
}
