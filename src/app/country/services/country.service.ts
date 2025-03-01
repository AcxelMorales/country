import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, delay, map, Observable, throwError } from 'rxjs';

import type { RestCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';

import { CountryMapper } from '../mappers/Country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((countries) => CountryMapper.mapRestCountrieToCountryArray(countries)),
      catchError((_) => {
        return throwError(() => new Error(`No se encontró un país con la capital: ${query}`));
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    return this.http.get<RestCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((countries) => CountryMapper.mapRestCountrieToCountryArray(countries)),
      delay(2000),
      catchError((_) => {
        return throwError(() => new Error(`No se encontró un país con: ${query}`));
      })
    );
  }

  searchCountryByCode(code: string): Observable<Country> {
    return this.http.get<RestCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.mapRestCountrieToCountryArray(resp)),
      map((coutries) => coutries.at(0)!),
      catchError((_) => {
        return throwError(() => new Error(`No se pudo obtener países con ese código: ${code}`));
      })
    );
  }

}
