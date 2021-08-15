import { Inject, Injectable } from "@angular/core";
import { WalletconnectConfig, WC_CONFIG } from "./walletconnect.config";
import { from, Observable, throwError } from "rxjs";
import { tap } from 'rxjs/operators';

import WalletConnectClient, { CLIENT_EVENTS } from "@walletconnect/client";
import { PairingTypes, SessionTypes } from "@walletconnect/types";
import QRCodeModal from '@walletconnect/qrcode-modal';

export interface ConnectOptions {
  topic?: string,
  chains: string[],
  methods: string[]
}

@Injectable()
export class WalletconnectService {

  private client: WalletConnectClient = new WalletConnectClient();

  constructor(@Inject(WC_CONFIG) private config: WalletconnectConfig) {}

  public init(): Observable<WalletConnectClient> {
    return from(WalletConnectClient.init({
      relayProvider: this.config.relayProvider,
      metadata: this.config.metaData,
      logger: this.config.logging
    })).pipe(tap(client => {this.client = client; this.startListening()}));
  }

  public connect(opts: ConnectOptions): Observable<SessionTypes.Settled> {
    if (!this.client) {
      throwError("walletconnect client has not been initialized!");
    }

    const params = {
      metadata: this.client.metadata,
      pairing: opts.topic ? { topic: opts.topic } : undefined,
      permissions: {
        blockchain: {
            chains: opts.chains
        },
        jsonrpc: {
          methods: opts.methods,
        },
      }
    };
    return from(this.client.connect(params));
  }

  private startListening(): void {
    this.client.on(CLIENT_EVENTS.pairing.proposal, async (proposal: PairingTypes.Proposal) => {
      console.log("pairing.proposal", proposal);
      const { uri } = proposal.signal.params
      QRCodeModal.open(uri, () => {
        console.log("EVENT", "QR Code Modal closed");
      });
    });

    this.client.on(CLIENT_EVENTS.pairing.created, async (s: any) => {
      console.log("pairing.created", s);
      QRCodeModal.close();
    });

    this.client.on(CLIENT_EVENTS.pairing.updated, async (session: SessionTypes.Settled) => {
      console.log("pairing.updated", session);
    });

    this.client.on(CLIENT_EVENTS.pairing.deleted, async (session: SessionTypes.Settled) => {
      console.log("pairing.deleted", session);
    });
  }



}
