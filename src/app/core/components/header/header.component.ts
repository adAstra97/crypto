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
    this.updatePortfolioValue();
    this.updatePortfolioDifference();

    this.portfolioService.portfolioCoins$.subscribe(() => {
      this.updatePortfolioValue();
    });
  }

  private loadPopularCoins(): void {
    this.popularCoins$ = this.coinService.getPopularCoins();
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
