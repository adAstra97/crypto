import { createAction, props } from '@ngrx/store';
import { ICoin } from '../../shared/models/coin-response.model';

const actionSource = '[CoinCap API]';

export const loadCoins = createAction(
  `${actionSource} Load Coins`,
  props<{
    limit: number;
    offset: number;
    search?: string;
    sortBy?: 'priceUsd' | 'marketCapUsd' | 'changePercent24Hr';
    sortDirection?: 'asc' | 'desc';
  }>()
);
export const loadCoinsSuccess = createAction(
  `${actionSource} Load Coins Success`,
  props<{ coins: ICoin[] }>()
);
export const loadCoinsFailure = createAction(
  `${actionSource} Load Coins Failure`,
  props<{ error: string | null }>()
);
