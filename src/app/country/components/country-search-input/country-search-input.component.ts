import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  value = output<string>();
  placeholder = input<string>('Buscar');

}
