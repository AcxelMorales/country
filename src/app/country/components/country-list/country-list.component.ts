import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  imports: [DecimalPipe, RouterLink]
})
export class CountryListComponent {

  countries = input.required<Country[]>();
  errorMessage = input<string | null>();
  isLoading = input<boolean>();
  isEmpty = input<boolean>();

}
