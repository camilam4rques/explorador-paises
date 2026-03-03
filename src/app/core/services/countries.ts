import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.baseUrl}/all?fields=name,cca3,population,region,capital,flags,borders,languages,currencies`
    ).pipe(
      timeout(15000),
      retry(1),
      catchError((error) => {
        console.error('Erro ao buscar paises:', error);
        return throwError(() => error);
      })
    );
  }

  getCountryByCode(code: string): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.baseUrl}/alpha/${code}?fields=name,cca3,population,region,subregion,capital,flags,borders,languages,currencies`
    );
  }

  searchByName(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.baseUrl}/name/${name}?fields=name,cca3,population,region,capital,flags,borders,languages,currencies`
    );
  }

  filterByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.baseUrl}/region/${region}?fields=name,cca3,population,region,capital,flags`
    );
  }
}
