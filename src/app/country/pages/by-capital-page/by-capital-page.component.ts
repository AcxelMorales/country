import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { of } from 'rxjs';

import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";

import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  imports: [CountryListComponent, CountrySearchInputComponent],
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  query = signal('');

  countryResource = rxResource({
    request: (): { query: string } => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countryService.searchByCapital(request.query);
    }
  });

}
