import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICountry } from './country.interface';

/***
 * TODO: Initial view should be set to the letter 'A'
 * TODO: Show the list of countries when letter is clicked
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /** Array of alphabet letters **/
  alphabetLetters = Array.from(Array(26)).map((_, i) =>
    String.fromCharCode(i + 65)
  );

  /** The currently selected letter **/
  selectedLetter: string;

  /** List of countries that match the currently selected letter **/
  countries$: Observable<ICountry[]> = of([]);

  constructor() {}

  /** Called when a letter is selected **/
  showCountryInfo(letter: string) {
    this.selectedLetter = letter;
    // TODO create the observable of the countries matching the selected letter
    // TODO use the api service
    // this.countries$ =
  }
}
