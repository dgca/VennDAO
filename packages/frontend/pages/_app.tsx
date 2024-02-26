import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import { Toaster } from "ui-kit";

import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import { queryClient } from "@/queryClient";
import { Web3Provider } from "@/web3/Web3Provider/Web3Provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

export default MyApp;
