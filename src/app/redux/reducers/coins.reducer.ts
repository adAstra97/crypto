import { createReducer, on } from '@ngrx/store';
import * as CoinsActions from '../actions/coins.actions';
import { ICoinState } from '../state.model';

export const initialState: ICoinState = {
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
