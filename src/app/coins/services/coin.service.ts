import {
  ICoin,
  ICoinResponse,
  IDetailResponse,
  IHistoryItem,
  IHistoryResponse,
} from './../../shared/models/coin-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  private readonly API_URL = 'https://api.coincap.io/v2/assets';

  constructor(private http: HttpClient) {}

  public getCoins(
    limit: number,
    offset: number,
    search?: string,
    sortBy?: 'priceUsd' | 'marketCapUsd' | 'changePercent24Hr',
    sortDirection?: 'asc' | 'desc'
  ) {
    let queryParams = `limit=${limit}&offset=${offset}`;

    if (search) {
      queryParams += `&search=${search}`;
    }

    return this.http.get<ICoinResponse>(`${this.API_URL}?${queryParams}`).pipe(
      map(response => {
        let coins = response.data;

        if (sortBy && sortDirection) {
          coins = this.sortCoins(coins, sortBy, sortDirection);
        }

        return coins;
      })
    );
  }

  public getTotalCoins(search?: string): Observable<number> {
    let queryParams = '';

    if (search) {
      queryParams += `&search=${search}`;
    }

    return this.http
      .get<ICoinResponse>(`${this.API_URL}?${queryParams}`)
      .pipe(map(response => response?.data?.length || 0));
  }

  public getCoinDetail(id: string): Observable<ICoin> {
    return this.http
      .get<IDetailResponse>(`${this.API_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  public getCoinHistory(
    id: string,
    interval: string
  ): Observable<IHistoryItem[]> {
    return this.http
      .get<IHistoryResponse>(
        `${this.API_URL}/${id}/history?interval=${interval}`
      )
      .pipe(map(response => response.data));
  }

  private sortCoins(
    coins: ICoin[],
    sortBy: 'priceUsd' | 'marketCapUsd' | 'changePercent24Hr',
    sortDirection: 'asc' | 'desc'
  ): ICoin[] {
    return coins.sort((a, b) => {
      const valueA = parseFloat(a[sortBy]);
      const valueB = parseFloat(b[sortBy]);

      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }
}
