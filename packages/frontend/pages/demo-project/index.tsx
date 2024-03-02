import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { formatUnits } from "viem";

import { Text, Card, Button, Field, Input, Form } from "ui-kit";

import { ThemeToggle } from "@/components/ThemeProvider/ThemeProvider";
import { getFormFields } from "@/utils/formUtils";
import { getContractAddresses } from "@/web3/getContractAddresses";
import { useMintBasedHam } from "@/web3/hooks/useMintBasedHam";
import { useContracts } from "@/web3/WagmiContractsProvider";

const contractAddresses = getContractAddresses();

export default function DemoProject() {
  const contracts = useContracts();
  const { mutate: handleMint } = useMintBasedHam();
  const demoProjectBalance = contracts.MockUSDC().balanceOf.useRead({
    args: [contractAddresses.DemoProject],
  });
  const projectBalance = demoProjectBalance.data
    ? formatUnits(demoProjectBalance.data, 6)
    : null;

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
          <Text.H1 className="text-center">Based Hams 🐹</Text.H1>
          <Text.Muted className="text-center">
            (Not a real project, but still pretty cool)
          </Text.Muted>

          <Card className="p-8 flex gap-8 mt-16 mx-auto">
            <div className="flex items-center">
              <Image height={500} width={500} alt="Ham 0" src="/ham-0.png" />
            </div>
            <div className="flex flex-col items-start">
              <Text.H2>These hams are off the chain</Text.H2>
              <Text.Plain>
                Mint a hamster and get a poster shipped to you
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
                <div>
                  <Text.Small>
                    Demo project balance: {projectBalance}
                  </Text.Small>
                </div>
                <div className="flex justify-end w-full mt-4 gap-2">
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
