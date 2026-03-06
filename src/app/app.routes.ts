import { Routes } from '@angular/router';
import { CountriesList} from './features/countries/pages/countries-list/countries-list';
import { CountryDetail } from './features/countries/pages/country-detail/country-detail';

export const routes: Routes = [
  {    path: '',    component: CountriesList  },
  {    path: 'countries/:id',component: CountryDetail  },
  {    path: '**',    redirectTo: ''  }
];
