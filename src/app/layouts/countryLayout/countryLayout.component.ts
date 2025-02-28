import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TopMenuComponent } from "../../country/components/top-menu/top-menu.component";

@Component({
  selector: 'app-countryLayout',
  templateUrl: './countryLayout.component.html',
  imports: [RouterOutlet, TopMenuComponent]
})
export class CountryLayoutComponent {}
