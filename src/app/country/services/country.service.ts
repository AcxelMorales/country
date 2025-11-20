import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import type { RestCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

import { CountryMapper } from '../mappers/Country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly http = inject(HttpClient);

  private readonly queryCacheCapital = new Map<string, Country[]>();
  private readonly queryCacheCountry = new Map<string, Country[]>();
  private readonly queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)!);
    }

    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((countries) => CountryMapper.mapRestCountrieToCountryArray(countries)),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError((_) => {
        return throwError(() => new Error(`No se encontró un país con la capital: ${query}`));
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query)!);
    }

    return this.http.get<RestCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((countries) => CountryMapper.mapRestCountrieToCountryArray(countries)),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      catchError((_) => {
        return throwError(() => new Error(`No se encontró un país con: ${query}`));
      })
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region)!);
    }

    return this.http.get<RestCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((regions) => CountryMapper.mapRestCountrieToCountryArray(regions)),
      tap(regions => this.queryCacheRegion.set(region, regions)),
      catchError((_) => {
        return throwError(() => new Error(`No se encontró un país con: ${region}`));
      })
    );
  }

  searchCountryByCode(code: string): Observable<Country> {
    code = code.toLocaleLowerCase();

    return this.http.get<RestCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.mapRestCountrieToCountryArray(resp)),
      map((coutries) => coutries.at(0)!),
      catchError((_) => {
        return throwError(() => new Error(`No se pudo obtener países con ese código: ${code}`));
      })
    );
  }

}
