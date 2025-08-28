"use client";

import {
  GelatoSmartWalletContextProvider,
  dynamic,
  wagmi,
} from "@gelatonetwork/smartwallet-react-sdk";
import { inkSepolia } from "wagmi/chains";
import { http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const wagmiConfig = wagmi({
  chains: [inkSepolia],
  transports: {
    [inkSepolia.id]: http(process.env.GELATO_INK_SEPOLIA_RPC_URL),
  },
});

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <GelatoSmartWalletContextProvider
      settings={{
        scw: {
          type: "gelato", // use gelato, kernel, safe, or custom
        },
        apiKey: process.env.NEXT_PUBLIC_GELATO_API_KEY as string,
        defaultChain: inkSepolia,
        waas: dynamic(process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID as string),
        wagmi: wagmiConfig,
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </GelatoSmartWalletContextProvider>
  );
};

export default Providers;
