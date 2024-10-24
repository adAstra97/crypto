import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICoin } from '../../../shared/models/coin-response.model';
import * as CoinsActions from '../../../redux/actions/coins.actions';
import * as fromCoinsSelectors from '../../../redux/selectors/coins.selectors';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss',
})
export class CoinListComponent implements OnInit {
  public displayedColumns: string[] = [
    'logo',
    'symbol',
    'priceUsd',
    'marketCapUsd',
    'changePercent24Hr',
    'actions',
  ];
  public dataSource = new MatTableDataSource();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadData(10, 0);
  }

  private loadData(limit: number, offset: number): void {
    this.store.dispatch(CoinsActions.loadCoins({ limit, offset }));
    this.store.select(fromCoinsSelectors.selectAllCoins).subscribe(data => {
      this.dataSource.data = data.coins;
    });
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getIconUrl(symbol: string): string {
    return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
  }

  public formatPrice(price: number): string {
    return String(price);
  }

  public onPageChange(event: PageEvent): void {
    this.loadData(event.pageSize, event.pageIndex * event.pageSize);
  }

  public addToPortfolio(coin: ICoin): void {
    console.log('Added to portfolio:', coin);
  }
}
