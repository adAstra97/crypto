import { createReducer, on } from '@ngrx/store';
import * as CoinsActions from '../actions/coins.actions';
import { ICoinState } from '../state.model';

export const initialState: ICoinState = {
  coins: [],
  loading: false,
  error: null,
};

export const coinReducer = createReducer(
  initialState,
  on(CoinsActions.loadCoins, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CoinsActions.loadCoinsSuccess, (state, { coins }) => ({
    ...state,
    coins,
    loading: false,
  })),
  on(CoinsActions.loadCoinsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
