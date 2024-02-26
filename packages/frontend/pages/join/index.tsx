import { formatUnits } from "viem";
import { useAccount } from "wagmi";

import { Button, Field, Form, Input, Text, Textarea } from "ui-kit";

import { JoinDaoModal } from "@/components/JoinDaoModal/JoinDaoModal";
import { MainLayout } from "@/components/Layouts/MainLayout";
import { getFormFields } from "@/utils/formUtils";
import { useJoinDao } from "@/web3/hooks/useJoinDao";
import { useContracts } from "@/web3/WagmiContractsProvider";

export default function Join() {
  const contracts = useContracts();
  const account = useAccount();
  const usdcBalance = contracts.MockUSDC().balanceOf.useRead({
    args: [account.address!],
    query: {
      enabled: !!account.address,
    },
  });

  const joinDao = useJoinDao();

  return (
    <>
      <MainLayout>
        <div className="container px-4 py-12 max-w-2xl mx-auto">
          <Text.H2 as="h1" className="leading-relaxed">
            Join the DAO and start accepting orders from the web3 world
          </Text.H2>

          <Text.P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text.P>

          <Form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();

              const fields = getFormFields(e.currentTarget.elements, [
                "name",
                "website",
                "description",
              ] as const);

              if (!fields.name) {
                return;
              }

              joinDao.mutation.mutate({
                name: fields.name,
                website: fields.website,
                description: fields.description,
              });
            }}
          >
            <Field label="Company Name">
              <Input name="name" />
            </Field>

            <Field label="Website">
              <Input name="website" />
            </Field>

            <Field label="Description">
              <Textarea name="description" />
            </Field>

            <Button>Mint Membership</Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                contracts.MockUSDC().mint();
              }}
            >
              Get mock USDC
            </Button>
            <Text.Plain>
              USDC Balance:{" "}
              {usdcBalance.data ? formatUnits(usdcBalance.data, 6) : 0}
            </Text.Plain>
          </Form>
        </div>
      </MainLayout>
      {joinDao.step !== "pending" && (
        <JoinDaoModal
          onClose={() => {
            joinDao.mutation.reset();
          }}
          step={joinDao.step}
        />
      )}
    </>
  );
}
