import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Text } from "ui-kit";

import { MainLayout } from "@/components/Layouts/MainLayout";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center fixed inset-0 -z-10">
        <div className="flex w-full blur-md opacity-60">
          <div className="w-1/2 aspect-square rounded-full border-2 translate-x-[15%] border-primary dark:border-slate-500" />
          <div className="w-1/2 aspect-square rounded-full border-2 translate-x-[-15%] border-primary dark:border-slate-500" />
        </div>
      </div>

      <MainLayout>
        <div className="container px-4 py-16 max-w-4xl mx-auto grow items-center flex">
          <div>
            <Text.H1 className="leading-relaxed">
              From Physical Goods to Digital Services: Offer Anything On-Chain
            </Text.H1>

            <Text.Plain
              as="p"
              className="text-2xl font-medium leading-normal mt-6"
            >
              Join a community-driven platform that makes offering and procuring
              services on the blockchain more accessible than ever.
            </Text.Plain>

            <Text.Plain
              as="p"
              className="text-2xl font-medium leading-normal mt-6"
            >
              Engage with a growing community of web3 projects seeking services
              like yours.
            </Text.Plain>

            <div className="flex justify-center mt-10">
              <Button
                size="xl"
                onClick={() => {
                  router.push("/join");
                }}
              >
                Join the DAO
              </Button>
            </div>

            <div className="border-b my-16 w-4/5 mx-auto" />

            <Text.P className="text-center">
              Are you a web3 project looking to integrate with our vendors?
              <br />
              Check out the{" "}
              <Link href="#">
                <Text.Anchor as="span">integration docs</Text.Anchor>
              </Link>{" "}
              to get started.
            </Text.P>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
