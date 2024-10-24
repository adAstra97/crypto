import { createReducer, on } from '@ngrx/store';
import { ICoin } from '../../shared/models/coin-response.model';
import * as CoinsActions from '../actions/coins.actions';

export interface CoinState {
  coins: ICoin[];
  error: string | null;
}

export const initialState: CoinState = {
  coins: [],
  error: null,
};

export const coinReducer = createReducer(
  initialState,
  on(CoinsActions.loadCoinsSuccess, (state, { coins }) => ({
    ...state,
    coins,
    error: null,
  })),
  on(CoinsActions.loadCoinsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
