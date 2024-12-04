import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map, catchError, of } from 'rxjs';
import { ResponseInterface } from '../interfaces';

type Currency = 'USD' | 'ARS' | 'MXN';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private exchangeRates: Record<Currency, number> = { USD: 1, ARS: 0, MXN: 0 };

  constructor(private apiService: ApiService) {}

  private fetchRate(
    endpoint: () => Observable<ResponseInterface>,
    currency: Currency
  ): Observable<number> {
    return endpoint().pipe(
      map((response: ResponseInterface) => {
        this.exchangeRates[currency] = response.value;
        return this.exchangeRates[currency];
      }),
      catchError(() => {
        console.error(`Error fetching ${currency}`);
        return of(0);
      })
    );
  }

  fetchDolarBlue(): Observable<number> {
    return this.fetchRate(() => this.apiService.getDolarBlue(), 'ARS');
  }

  fetchMxnPesos(): Observable<number> {
    return this.fetchRate(() => this.apiService.getMXNPesos(), 'MXN');
  }

  convertCurrency(
    amount: number,
    currency: Currency
  ): Record<Currency, number> {
    const usdAmount =
      currency === 'USD' ? amount : amount / this.exchangeRates[currency];

    return {
      USD: usdAmount,
      ARS: usdAmount * this.exchangeRates.ARS,
      MXN: usdAmount * this.exchangeRates.MXN,
    };
  }
}
