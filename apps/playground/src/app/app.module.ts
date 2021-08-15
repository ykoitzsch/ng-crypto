import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WalletconnectModule } from '@isleepcode/walletconnect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    WalletconnectModule.forRoot({
      relayProvider: 'wss://connect.coz.io:443',
      logging: 'debug',
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
