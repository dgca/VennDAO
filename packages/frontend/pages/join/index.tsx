import { useRouter } from "next/router";

import { Button, Field, Form, Input, Text, Textarea } from "ui-kit";

import { MainLayout } from "@/components/Layouts/MainLayout";

export default function Join() {
  const router = useRouter();
  return (
    <MainLayout>
      <div className="container px-4 py-12 max-w-2xl mx-auto">
        <Text.H2 as="h1" className="leading-relaxed">
          Join the DAO and start accepting orders from the web3 world
        </Text.H2>

        <Text.P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text.P>

        <Form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/dao/orders");
          }}
        >
          <Field label="Company Name">
            <Input />
          </Field>

          <Field label="Website">
            <Input />
          </Field>

          <Field label="Description">
            <Textarea />
          </Field>

          <Button>Mint Membership</Button>
        </Form>
      </div>
    </MainLayout>
  );
}
