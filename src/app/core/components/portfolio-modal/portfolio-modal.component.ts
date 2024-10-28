import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { ICoin } from '../../../shared/models/coin-response.model';

@Component({
  selector: 'app-portfolio-modal',
  templateUrl: './portfolio-modal.component.html',
  styleUrl: './portfolio-modal.component.scss',
})
export class PortfolioModalComponent implements OnInit {
  public coins: ICoin[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.portfolioCoins$.subscribe(coins => {
      this.coins = coins;
    });
  }

  public removeCoin(coinId: string): void {
    this.portfolioService.removeCoin(coinId);
  }

  public close(): void {
    console.log('close modal');
  }
}
