import type { Country } from '../interfaces/country.interface';
import type { RestCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {

  private static mapRestCountrieToCountry(restCountry: RestCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].official ?? 'no spanish name',
      capital: restCountry.capital?.join(','),
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    }
  }

  static mapRestCountrieToCountryArray(items: RestCountry[]): Country[] {
    return items.map(this.mapRestCountrieToCountry);
  }

}
