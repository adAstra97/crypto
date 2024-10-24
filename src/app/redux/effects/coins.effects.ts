import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CoinsActions from '../actions/coins.actions';
import { CoinService } from '../../coins/services/coin.service';

@Injectable()
export class CoinsEffects {
  loadCoins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoinsActions.loadCoins),
      mergeMap(action =>
        this.coinService.getCoins(action.limit, action.offset).pipe(
          map(data => CoinsActions.loadCoinsSuccess({ coins: data })),
          catchError(error => of(CoinsActions.loadCoinsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private coinService: CoinService
  ) {}
}
