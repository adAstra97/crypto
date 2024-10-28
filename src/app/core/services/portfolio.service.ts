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

  private loadPortfolioCoins(): ICoin[] {
    const portfolio = localStorage.getItem('portfolio');
    return portfolio ? JSON.parse(portfolio) : [];
  }

  private savePortfolioCoins(portfolio: ICoin[]): void {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }
}
