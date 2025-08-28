"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import {
  GelatoSmartWalletConnectButton,
  useGelatoSmartWalletProviderContext,
} from "@gelatonetwork/smartwallet-react-sdk";

export function ConeNectButton({
  className,
  pillClassName,
}: {
  className?: string;
  pillClassName?: string;
}) {
  const {
    gelato: { client },
    logout,
  } = useGelatoSmartWalletProviderContext();

  const addr = client?.account.address;
  const label = addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "Connected";

  if (!addr) {
    return (
      <GelatoSmartWalletConnectButton>
        Connect Wallet
      </GelatoSmartWalletConnectButton>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-sm",
          "text-gray-800 shadow-sm",
          pillClassName
        )}
        title={addr}
      >
        {label}
      </span>
      <button
        onClick={() => logout()}
        className={cn(
          "inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium",
          "bg-gray-900 text-white hover:bg-black focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
        )}
      >
        Disconnect
      </button>
    </div>
  );
}
