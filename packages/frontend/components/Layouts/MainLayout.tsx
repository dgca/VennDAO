import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import { Text } from "ui-kit";

import { ThemeToggle } from "../ThemeProvider/ThemeProvider";

type Props = {
  children: ReactNode;
  includeFooter?: boolean;
};

export function MainLayout({ children, includeFooter = true }: Props) {
  return (
    <>
      <Head>
        <title>VennDAO | Connecting IRL vendors to web3</title>
        <meta
          name="description"
          content="A starter kit for building web3 applications with RainbowKit, wagmi, and Next.js"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className="flex flex-col items-stretch min-h-svh">
        <nav className="flex justify-between items-center border-b py-2 px-4 sticky top-0 bg-background">
          <Link href="/" className="flex items-center gap-0">
            <div className="flex items-center">
              <div className="w-8 h-8 border-2 border-foreground rounded-full" />
              <div className="w-8 h-8 border-2 border-foreground rounded-full translate-x-[-10px]" />
            </div>
            <Text.H3 as="span" className="font-extrabold">
              VennDAO
            </Text.H3>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ConnectButton />
          </div>
        </nav>

        <main className="flex flex-col flex-grow">{children}</main>

        {includeFooter && (
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
        )}
      </div>
    </>
  );
}
