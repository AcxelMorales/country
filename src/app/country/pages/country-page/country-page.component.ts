import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';

import { CountryService } from '../../services/country.service';

import type { Country } from '../../interfaces/country.interface';

import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  imports: [NotFoundComponent, CountryInformationComponent],
})
export class CountryPageComponent {

  code = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: (): { code: string } => ({ code: this.code }),
    loader: (): Observable<Country> => this.countryService.searchCountryByCode(this.code)
  });

}
