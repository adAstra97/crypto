import { Component, OnInit } from '@angular/core';
import { CoinService } from '../../services/coin.service';
import { Observable } from 'rxjs';
import { ICoin } from '../../../shared/models/coin-response.model';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss',
})
export class CoinListComponent implements OnInit {
  public coins$!: Observable<ICoin[]>;

  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    this.coins$ = this.coinService.getCoins();
    this.coins$.subscribe(coins => console.log(coins));
  }
}
