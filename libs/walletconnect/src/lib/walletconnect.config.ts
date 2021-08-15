import { InjectionToken } from "@angular/core";

import { AppMetadata } from "@walletconnect/types";

export class WalletconnectConfig {
  relayProvider?: string = 'wss://relay.walletconnect.org';
  logging?: string;
  metaData?: AppMetadata = {
    name: "Example Dapp",
    description: "Example Dapp",
    url: "#",
    icons: ["https://walletconnect.org/walletconnect-logo.png"],
  };
}

export const WC_CONFIG = new InjectionToken<WalletconnectConfig>('wcConfig');
