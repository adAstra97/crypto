import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICoinState } from '../state.model';

export const selectCoinsStore = createFeatureSelector<ICoinState>('coins');

export const selectAllCoins = createSelector(
  selectCoinsStore,
  (state: ICoinState) => state.coins
);
