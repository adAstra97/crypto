import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CoinsActions from '../../../redux/actions/coins.actions';
import * as fromCoinsSelectors from '../../../redux/selectors/coins.selectors';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CoinService } from '../../services/coin.service';
import { Router } from '@angular/router';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { ICoin } from '../../../shared/models/coin-response.model';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss',
})
export class CoinListComponent implements OnInit {
  private searchSubject = new Subject<string>();

  public coins$ = this.store.select(fromCoinsSelectors.selectAllCoins);
  public searchQuery = '';
  public currentOffset = 0;
  public pageSize = 10;
  public totalCoins = 0;

  public sortBy?: 'priceUsd' | 'marketCapUsd' | 'changePercent24Hr';
  public sortDirection: 'asc' | 'desc' = 'asc';

  public isAddCoinModalOpen = false;
  public selectedCoin?: ICoin;

  constructor(
    private store: Store,
    private router: Router,
    private coinService: CoinService,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadTotalCoins();

    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(searchQuery => {
        this.searchQuery = searchQuery;
        this.currentOffset = 0;
        this.loadData();
        this.loadTotalCoins(searchQuery);
      });
  }

  private loadData(): void {
    this.store.dispatch(
      CoinsActions.loadCoins({
        limit: this.pageSize,
        offset: this.currentOffset,
        search: this.searchQuery,
        sortBy: this.sortBy,
        sortDirection: this.sortDirection,
      })
    );
  }

  private loadTotalCoins(value?: string): void {
    this.coinService.getTotalCoins(value).subscribe(total => {
      this.totalCoins = total;
    });
  }

  public onSearch(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(filterValue);
  }

  public onSort(
    field: 'priceUsd' | 'marketCapUsd' | 'changePercent24Hr'
  ): void {
    if (this.sortBy === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortDirection = 'asc';
    }
    this.loadData();
  }

  public getIconUrl(symbol: string): string {
    return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
  }

  public formatPrice(price: string): string {
    const priceToDigit = +price;
    const fixedDigit = priceToDigit.toFixed(2);

    if (fixedDigit == '0.00') return '0.01';

    if (priceToDigit > 1e9) return (priceToDigit / 1e9).toFixed(2) + 'b';
    if (priceToDigit > 1e6) return (priceToDigit / 1e6).toFixed(2) + 'm';
    if (priceToDigit > 1e3) return (priceToDigit / 1e3).toFixed(2) + 'k';

    return priceToDigit.toFixed(2);
  }

  public get isFirstPage(): boolean {
    return this.currentOffset === 0;
  }

  public get isLastPage(): boolean {
    return this.currentOffset + this.pageSize >= this.totalCoins;
  }

  public onPreviousPage(): void {
    if (!this.isFirstPage) {
      this.currentOffset -= this.pageSize;
      this.loadData();
    }
  }

  public onNextPage(): void {
    if (!this.isLastPage) {
      this.currentOffset += this.pageSize;
      this.loadData();
    }
  }

  public openAddCoinModal(event: MouseEvent, coin: ICoin): void {
    event.stopPropagation();
    this.selectedCoin = coin;
    this.isAddCoinModalOpen = true;
  }

  public closeAddCoinModal(): void {
    this.isAddCoinModalOpen = false;
    this.selectedCoin = undefined;
  }

  public addToPortfolio(quantity: number): void {
    if (this.selectedCoin) {
      this.portfolioService.addCoin(this.selectedCoin, quantity);
      this.closeAddCoinModal();
    }
  }

  public navigateToCoin(coinId: string): void {
    this.router.navigate(['/coin', coinId]);
  }
}
