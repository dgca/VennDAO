import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";

import { Toaster } from "ui-kit";

import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import { queryClient } from "@/queryClient";
import { Web3Provider } from "@/web3/Web3Provider/Web3Provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>VennDAO | Connecting IRL vendors to web3</title>
        <meta
          name="description"
          content="A starter kit for building web3 applications with RainbowKit, wagmi, and Next.js"
        />
        <link href="https://emojicdn.elk.sh/🪿" rel="icon" />
      </Head>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          <Web3Provider>
            <Component {...pageProps} />
            <Toaster />
          </Web3Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
