import { Component, inject, signal, effect } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { of } from 'rxjs';

import { CountryListComponent } from "../../components/country-list/country-list.component";

import { Region } from '../../interfaces/region.type';

import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region',
  imports: [CountryListComponent],
  templateUrl: './by-region.component.html',
})
export class ByRegionComponent {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  selectedRegion = signal<Region | null>(null);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  constructor() {
    const queryParam = this.activatedRoute.snapshot.queryParamMap.get('query');

    if (queryParam && this.isValidRegion(queryParam)) {
      this.selectedRegion.set(queryParam as Region);
    }
  }

  private isValidRegion(value: string): boolean {
    return this.regions.includes(value as Region);
  }

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  countryResource = rxResource({
    request: (): { region: Region } => ({ region: this.selectedRegion()! }),
    loader: ({ request }) => {
      if (!request.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: request.region
        }
      });

      return this.countryService.searchByRegion(request.region);
    }
  });

}
