import { Component, OnInit } from '@angular/core';
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
  public popularCoins!: ICoin[];
  public portfolioValue!: number;
  public portfolioDifference!: IPortfolioDifference;

  constructor(
    private coinService: CoinService,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.updatePortfolioValue();
    this.updatePortfolioDifference();

    this.portfolioService.portfolioCoins$.subscribe(() => {
      this.updatePortfolioValue();
    });

    this.coinService.popularCoins$.subscribe(coins => {
      this.popularCoins = coins;
    });
  }

  private updatePortfolioValue(): void {
    this.portfolioValue = this.portfolioService.getPortfolioValue();
  }

  private updatePortfolioDifference(): void {
    this.portfolioService.getPortfolioDifference().subscribe(difference => {
      this.portfolioDifference = difference;
    });
  }
}
