import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletconnectService } from './walletconnect.service';
import { WalletconnectConfig, WC_CONFIG } from './walletconnect.config';

@NgModule({
  imports: [CommonModule],
})
export class WalletconnectModule {

  static forRoot(config: WalletconnectConfig): ModuleWithProviders<WalletconnectModule> {
    return {
      ngModule: WalletconnectModule,
      providers: [
        {
          provide: WC_CONFIG,
          useValue: config
        },
        WalletconnectService,
      ]
    }
  }
}
