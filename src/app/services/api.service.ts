import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseInterface } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl: string = 'https://converter-server-b0vf.onrender.com/api';                                     

  constructor(private http: HttpClient) {}

  private get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }

  getDolarBlue(): Observable<ResponseInterface> {
    return this.get<ResponseInterface>('dolar_blue');
  }

  getMXNPesos(): Observable<ResponseInterface> {
    return this.get<ResponseInterface>('mxn_pesos');
  }
}
