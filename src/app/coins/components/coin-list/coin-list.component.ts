import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICoin } from '../../../shared/models/coin-response.model';
import { Store } from '@ngrx/store';
import * as CoinsActions from '../../../redux/actions/coins.actions';
import * as fromCoinsSelectors from '../../../redux/selectors/coins.selectors';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss',
})
export class CoinListComponent implements OnInit {
  public coins$: Observable<ICoin[]> = this.store.select(
    fromCoinsSelectors.selectAllCoins
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(CoinsActions.loadCoins({ limit: 10, offset: 0 }));
  }
}
