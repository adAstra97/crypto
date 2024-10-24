import { ICoin } from '../shared/models/coin-response.model';

export interface ICoinState {
  coins: ICoin[];
  loading: boolean;
  error: string | null;
}

export interface IAppState {
  coins: ICoinState;
}
