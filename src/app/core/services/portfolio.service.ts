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

  public getPortfolioValue(): number {
    const portfolio = this.loadPortfolioCoins();
    return portfolio.reduce(
      (total, coin) => total + +coin.priceUsd * (coin.quantity || 0),
      0
    );
  }

  public getPortfolioDifference(): { value: number; percent: number } {
    const portfolio = this.loadPortfolioCoins();
    const originalValue = portfolio.reduce(
      (total, coin) => total + (coin.purchasePrice || 0) * (coin.quantity || 0),
      0
    );
    const currentValue = this.getPortfolioValue();
    const difference = currentValue - originalValue;
    const percent = originalValue > 0 ? (difference / originalValue) * 100 : 0;
    return { value: difference, percent };
  }

  private loadPortfolioCoins(): ICoin[] {
    const portfolio = localStorage.getItem('portfolio');
    return portfolio ? JSON.parse(portfolio) : [];
  }

  private savePortfolioCoins(portfolio: ICoin[]): void {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }
}
