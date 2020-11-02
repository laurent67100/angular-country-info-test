import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RestCountry } from './rest-country.interface';
import { ICountry } from '../app/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets a list of country codes starting with the specified letter
   * **/
  getCountryCodes(startsWithLetter?: string): Observable<string[]> {
    return this.httpClient
      .get<RestCountry[]>('https://restcountries.eu/rest/v2/all')
      .pipe(
        map((countries) =>
          countries.filter(
            (country) =>
              !startsWithLetter ||
              country.name
                .toLowerCase()
                .startsWith(startsWithLetter.toLowerCase())
          )
        ),
        map((countries) => countries.map((c) => c.alpha2Code))
      );
  }

  /**
   * Gets the info for the country identified by the specified country code
   * **/
  getCountryInfo(code: string): Observable<ICountry> {
    // TODO: how would you handle an error on the api endpoint?
    // TODO-bonus: how to retry the endpoint call up to 3 times on failure?
    return this.httpClient
      .get<RestCountry>(`https://restcountries.eu/rest/v2/alpha/${code}`)
      .pipe(
        map((country) => ({
          name: country.name,
          capital: country.capital,
          currencies: country.currencies?.map((curr) => curr.code),
          flagUrl: country.flag,
        }))
      );
  }
}
