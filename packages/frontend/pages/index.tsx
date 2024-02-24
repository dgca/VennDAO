import { useRouter } from "next/router";

import { Button, Text } from "ui-kit";

import { MainLayout } from "@/components/Layouts/MainLayout";

export default function Home() {
  const router = useRouter();
  return (
    <MainLayout>
      <div className="container px-4 py-12 max-w-4xl mx-auto">
        <Text.H1 className="leading-relaxed">
          Connecting vendors of physical goods to the web3 ecosystem.
        </Text.H1>

        <Text.P>
          Vendors, join the DAO, add your products and services, and start
          accepting orders from the web3 world.
        </Text.P>

        <div className="flex justify-center mt-8">
          <Button
            onClick={() => {
              router.push("/join");
            }}
          >
            Join the DAO
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
