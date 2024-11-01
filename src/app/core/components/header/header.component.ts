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
  public isAdding = false;
  public isPortfolioModalOpen = false;
  public portfolioCoins!: ICoin[];

  constructor(
    private coinService: CoinService,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.updatePortfolioValue();
    this.updatePortfolioDifference();

    this.portfolioService.portfolioCoins$.subscribe(data => {
      this.updatePortfolioValue();
      this.updatePortfolioDifference();

      this.portfolioCoins = data;
    });

    this.coinService.popularCoins$.subscribe(coins => {
      this.popularCoins = coins;
    });
  }

  public openPortfolioModal(): void {
    this.isPortfolioModalOpen = true;
  }

  public closePortfolioModal(): void {
    this.isPortfolioModalOpen = false;
  }

  public removeFromPortfolio(coinId: string): void {
    this.portfolioService.removeCoin(coinId);

    if (this.portfolioCoins.length === 0) {
      this.closePortfolioModal();
    }
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
