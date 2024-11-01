import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICoin } from '../../shared/models/coin-response.model';
import { CoinService } from '../../coins/services/coin.service';

interface IPortfolioDifference {
  value: number;
  percent: number;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private portfolioCoinsSubject = new BehaviorSubject<ICoin[]>(
    this.loadPortfolioCoins()
  );
  public portfolioCoins$ = this.portfolioCoinsSubject.asObservable();

  constructor(private coinService: CoinService) {}

  public addCoin(coin: ICoin, quantity: number): void {
    const portfolio = this.loadPortfolioCoins();
    const existingCoinIndex = portfolio.findIndex(c => c.id === coin.id);

    if (existingCoinIndex > -1) {
      const existingCoin = portfolio[existingCoinIndex];
      existingCoin.quantity = (existingCoin.quantity || 0) + quantity;
    } else {
      portfolio.push({ ...coin, quantity });
    }

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
      (total, coin) => total + (+coin.priceUsd || 0) * (coin.quantity || 0),
      0
    );
  }
  public getPortfolioDifference(): Observable<IPortfolioDifference> {
    const portfolio = this.loadPortfolioCoins();
    const portfolioValue = this.getPortfolioValue();

    return this.coinService.getTotalCoins().pipe(
      map(allCoins => {
        const currentValue = this.calculateCurrentValue(portfolio, allCoins);
        const difference = currentValue - portfolioValue;
        const percent =
          portfolioValue > 0 ? (difference / portfolioValue) * 100 : 0;
        return { value: difference, percent };
      })
    );
  }
  public loadPortfolioCoins(): ICoin[] {
    const portfolio = localStorage.getItem('portfolio');
    return portfolio ? JSON.parse(portfolio) : [];
  }

  private calculateCurrentValue(portfolio: ICoin[], allCoins: ICoin[]): number {
    return portfolio.reduce((total, coin) => {
      const currentCoin = allCoins.find(c => c.id === coin.id);
      const currentPrice = currentCoin ? currentCoin.priceUsd : 0;
      return total + +currentPrice * (coin.quantity || 0);
    }, 0);
  }

  private savePortfolioCoins(portfolio: ICoin[]): void {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }
}
