import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICoin } from '../../../shared/models/coin-response.model';
import { CoinService } from '../../../coins/services/coin.service';
import { PortfolioService } from '../../services/portfolio.service';

interface IPortfolioDifference {
  value: number;
  percent: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public popularCoins$!: Observable<ICoin[]>;
  public portfolioValue!: number;
  public portfolioDifference!: IPortfolioDifference;

  constructor(
    private coinService: CoinService,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.loadPopularCoins();
    this.portfolioValue = this.portfolioService.getPortfolioValue();
    this.portfolioDifference = this.portfolioService.getPortfolioDifference();
  }

  private loadPopularCoins(): void {
    this.popularCoins$ = this.coinService.getPopularCoins();
  }
}
