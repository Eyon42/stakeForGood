import { type AppType } from "next/dist/shared/lib/utils";

import { QueryClient, QueryClientProvider } from "react-query";
import "@/styles/globals.css";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { PoolTogetherProvider } from "@/components/PoolTogetherProvider";

// const chains = [arbitrum, mainnet, polygon];
const chains = [polygon];
const projectId = "92c9ebe1b26eb6e1037c862395adcdc7";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const queryClient = new QueryClient();

import { Nunito } from "next/font/google";

export const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <PoolTogetherProvider>
          <main className="text-white">
            <style jsx global>{`
              html {
                font-family: ${nunito.style.fontFamily};
              }
            `}</style>
            <Component {...pageProps} />
          </main>
        </PoolTogetherProvider>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </QueryClientProvider>
  );
};

export default MyApp;
