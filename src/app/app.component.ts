import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const alphabet = Array.from(Array(26)).map((_, i) =>
      String.fromCharCode(i + 65)
    );
  }
}
