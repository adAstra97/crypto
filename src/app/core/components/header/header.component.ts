import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICoin } from '../../../shared/models/coin-response.model';
import { CoinService } from '../../../coins/services/coin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public popularCoins$!: Observable<ICoin[]>;

  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    this.loadPopularCoins();
  }

  private loadPopularCoins(): void {
    this.popularCoins$ = this.coinService.getPopularCoins();
  }
}
