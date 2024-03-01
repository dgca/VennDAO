import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

import { Text, Card, Button, Field, Input, Form } from "ui-kit";

import { ThemeToggle } from "@/components/ThemeProvider/ThemeProvider";
import { getFormFields } from "@/utils/formUtils";
import { useMintBasedHam } from "@/web3/hooks/useMintBasedHam";

export default function DemoProject() {
  const { mutate: handleMint } = useMintBasedHam();

  return (
    <>
      <div className="flex flex-col items-stretch min-h-svh">
        <nav className="flex justify-end items-center py-2 px-4 sticky top-0">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ConnectButton />
          </div>
        </nav>

        <main className="flex flex-col flex-grow">
          <Text.H1 className="text-center">Implementation Demo</Text.H1>

          <Card className="p-8 flex gap-8 mt-16 mx-auto">
            <div className="flex items-center">
              <Image height={500} width={500} alt="Ham 0" src="/ham-0.png" />
            </div>
            <div className="flex flex-col items-start">
              <Text.H2>BasedHams</Text.H2>
              <Text.Plain>
                Mint your hamster NFT and get a free poster!
              </Text.Plain>
              <Form
                className="mt-6"
                id="mint-hamster-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fields = getFormFields(e.currentTarget.elements, [
                    "address",
                    "city",
                    "state",
                    "postalCode",
                  ] as const);
                  handleMint(fields);
                }}
              >
                <Field label="Address">
                  <Input name="address" />
                </Field>
                <Field label="City">
                  <Input name="city" />
                </Field>
                <div className="flex gap-4">
                  <Field label="State">
                    <Input name="state" />
                  </Field>
                  <Field label="Postal Code">
                    <Input name="postalCode" />
                  </Field>
                </div>
                <div className="flex justify-end w-full mt-4">
                  <Button className="bg-purple-500 mt-auto hover:bg-purple-700">
                    Mint my hamster
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </main>

        <footer className="flex justify-center items-center py-6 gap-2">
          <Text.Small>A project by The Big Goose&nbsp;&nbsp;•</Text.Small>
          <Image
            // hard to see in dark mode, let's add some tailwind classes to fix that
            className="dark:invert dark:hue-rotate-[160deg]"
            src="/minigoose.png"
            alt=""
            width={66 / 4}
            height={99 / 4}
          />
        </footer>
      </div>
    </>
  );
}
