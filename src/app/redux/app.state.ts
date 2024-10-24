import { ActionReducerMap } from '@ngrx/store';

import { coinReducer } from './reducers/coins.reducer';
import { IAppState } from './state.model';

export const reducers: ActionReducerMap<IAppState> = {
  coins: coinReducer,
};
