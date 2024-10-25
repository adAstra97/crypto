export interface ICoin {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface IHistoryItem {
  priceUsd: string;
  time: number;
}

export interface ICoinResponse {
  data: ICoin[];
}

export interface IDetailResponse {
  data: ICoin;
}

export interface IHistoryResponse {
  data: IHistoryItem[];
}
