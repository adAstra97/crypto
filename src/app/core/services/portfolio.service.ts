import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICoin } from '../../shared/models/coin-response.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private portfolioCoinsSubject = new BehaviorSubject<ICoin[]>(
    this.loadPortfolioCoins()
  );
  public portfolioCoins$ = this.portfolioCoinsSubject.asObservable();

  public addCoin(coin: ICoin, quantity: number): void {
    const portfolio = this.loadPortfolioCoins();
    portfolio.push({ ...coin, quantity, purchasePrice: +coin.priceUsd });
    this.savePortfolioCoins(portfolio);
    this.portfolioCoinsSubject.next(portfolio);
  }

  public removeCoin(coinId: string): void {
    const portfolio = this.loadPortfolioCoins().filter(
      coin => coin.id !== coinId
    );
    this.savePortfolioCoins(portfolio);
    this.portfolioCoinsSubject.next(portfolio);
  }

  private loadPortfolioCoins(): ICoin[] {
    const portfolio = localStorage.getItem('portfolio');
    return portfolio ? JSON.parse(portfolio) : [];
  }

  private savePortfolioCoins(portfolio: ICoin[]): void {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }
}
