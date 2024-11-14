import { ICoin } from '../models/coin-response.model';

export const exampleCoins: ICoin[] = [
  {
    id: 'btc',
    symbol: 'BTC',
    quantity: 2,
    priceUsd: '30000',
    rank: '1',
    name: 'Bitcoin',
    supply: '19000000',
    maxSupply: '21000000',
    marketCapUsd: '600000000000',
    volumeUsd24Hr: '20000000000',
    changePercent24Hr: '1.5',
    vwap24Hr: '100',
  },
  {
    id: 'eth',
    symbol: 'ETH',
    quantity: 5,
    priceUsd: '2000',
    rank: '2',
    name: 'Ethereum',
    supply: '120000000',
    maxSupply: null,
    marketCapUsd: '240000000000',
    volumeUsd24Hr: '10000000000',
    changePercent24Hr: '-0.5',
    vwap24Hr: '10',
  },
];

export const exampleHistory = [
  { time: Date.now() - 3600 * 1000, priceUsd: '29000' },
  { time: Date.now(), priceUsd: '30000' },
];
