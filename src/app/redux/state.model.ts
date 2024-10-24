import { ICoin } from '../shared/models/coin-response.model';

export interface ICoinState {
  coins: ICoin[];
  error: string | null;
}

export interface IAppState {
  coins: ICoinState;
}
