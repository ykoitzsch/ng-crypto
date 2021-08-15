import { Component, OnInit } from '@angular/core';
import { ConnectOptions, WalletconnectService } from '@isleepcode/walletconnect';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'isleepcode-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'playground';

  constructor(private wc: WalletconnectService) {}

  ngOnInit(): void {
    const opts: ConnectOptions = {
      chains: ['neo3:testnet'],
      methods: ['invokefunction'],
    }
    this.wc.init().pipe(
      switchMap(() =>this.wc.connect(opts))).subscribe();
  }

}
