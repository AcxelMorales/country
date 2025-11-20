import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  value = output<string>();
  placeholder = input<string>('Buscar');
  initialValue = input<string>('');
  inputValue = linkedSignal<string>((): string => this.initialValue());

  debounceEffect = effect((onCleanup): void => {
    const value = this.inputValue();

    const timeout = setTimeout((): void => {
      this.value.emit(value);
    }, 500);

    onCleanup((): void => {
      clearTimeout(timeout)
    })
  });

}
