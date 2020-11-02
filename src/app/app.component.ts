import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { CountryService } from '../api/country.service';
import { ICountry } from './country.interface';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  /** Array of alphabet letters **/
  alphabetLetters = Array.from(Array(26)).map((_, i) =>
    String.fromCharCode(i + 65)
  );

  /** The currently selected letter **/
  selectedLetter: string;

  /** List of countries that match the currently selected letter **/
  countries$: Observable<ICountry[]> = of([]);

  /** @ignore Pattern used to close all subscriptions */
  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(private countryService: CountryService) {}

  /** Called when a letter is selected **/
  showCountryInfo(letter: string) {
    this.selectedLetter = letter;
    this.countries$ = this.countryService
      .getCountryCodes(letter)
      .pipe(
        mergeMap((countryCodes) =>
          forkJoin(
            countryCodes.map((countryCode) =>
              this.countryService.getCountryInfo(countryCode)
            )
          )
        )
      );
  }

  ngOnInit(): void {
    this.showCountryInfo('A');
  }

  /** @ignore */
  ngOnDestroy(): void {
    // unsubscribe all subscriptions
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
  }
}
