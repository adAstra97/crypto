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
  private readonly API_URL = 'https://api.coincap.io/v2';

  constructor(private http: HttpClient) {}

  getCoins(limit = 10, offset = 0): Observable<ICoin[]> {
    return this.http
      .get<ICoinResponse>(
        `${this.API_URL}/assets?limit=${limit}&offset=${offset}`
      )
      .pipe(map(response => response.data));
  }
}
