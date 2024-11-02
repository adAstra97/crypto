import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICoin } from '../../../shared/models/coin-response.model';
import { CoinService } from '../../../coins/services/coin.service';
import { PortfolioService } from '../../services/portfolio.service';
import { Subscription } from 'rxjs';

interface IPortfolioDifference {
  value: number;
  percent: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public popularCoins!: ICoin[];
  public portfolioValue!: number;
  public portfolioDifference!: IPortfolioDifference;
  public isAdding = false;
  public isPortfolioModalOpen = false;
  public portfolioCoins!: ICoin[];

  private subscriptions: Subscription[] = [];

  constructor(
    private coinService: CoinService,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.updatePortfolioValue();
    this.updatePortfolioDifference();

    const portfolioCoinsSubscription =
      this.portfolioService.portfolioCoins$.subscribe(data => {
        this.updatePortfolioValue();
        this.updatePortfolioDifference();
        this.portfolioCoins = data;
      });

    const popularCoinsSubscription = this.coinService.popularCoins$.subscribe(
      coins => {
        this.popularCoins = coins;
      }
    );

    this.subscriptions.push(this.coinService.getPopularCoins().subscribe());
    this.subscriptions.push(portfolioCoinsSubscription);
    this.subscriptions.push(popularCoinsSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
    const differenceSubscription = this.portfolioService
      .getPortfolioDifference()
      .subscribe(difference => {
        this.portfolioDifference = difference;
      });

    this.subscriptions.push(differenceSubscription);
  }
}
