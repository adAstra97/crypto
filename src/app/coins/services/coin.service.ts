import {
  ICoin,
  ICoinResponse,
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
    limit = 10,
    offset = 0,
    search?: string
  ): Observable<ICoin[]> {
    let queryParams = `limit=${limit}&offset=${offset}`;

    if (search) {
      queryParams += `&search=${search}`;
    }

    return this.http
      .get<ICoinResponse>(`${this.API_URL}?${queryParams}`)
      .pipe(map(response => response.data));
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
}
