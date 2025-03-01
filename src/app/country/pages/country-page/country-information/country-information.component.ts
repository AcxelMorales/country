import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import type { Country } from '../../../interfaces/country.interface';

@Component({
  selector: 'app-country-information',
  templateUrl: './country-information.component.html',
  imports: [DecimalPipe]
})
export class CountryInformationComponent {

  country = input.required<Country>();

  currentYear = computed(() => new Date().getFullYear);

}
