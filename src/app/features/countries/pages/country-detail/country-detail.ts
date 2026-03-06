import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../../../core/services/countries.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoadingService } from '../../../../core/services/loading.service';
import { firstValueFrom } from 'rxjs';
import { Country } from '../../../../core/models/country.model';
import { NavigationService } from '../../../../core/services/navigation.service';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-detail.html',
  styleUrls: ['./country-detail.css'],
})
export class CountryDetail implements OnInit {
  country: Country | null = null;
  borderCountries: Record<string, Country> = {};
  error = false;
  allCountries: Country[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
    private sanitizer: DomSanitizer,
    private loadingService: LoadingService,
    private navigationService: NavigationService
  ) { }

  //funcao inicial
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const countryCode = params.get('id');

      if (countryCode) {
        this.navigationService.push(countryCode);
        this.borderCountries = {};
        this.country = null;
        this.loadCountryDetails(countryCode);
      }
    });
  }

  // Funcao para carregar detalhes do pais
  async loadCountryDetails(code: string): Promise<void> {
    this.loadingService.show();
    try {
      const data = await firstValueFrom(this.countriesService.getCountryByCode(code));

      this.country = data?.[0] ?? null;
      if (this.country?.borders?.length) {
        this.loadBorderCountries(this.country.borders);
      }
      this.error = !this.country;

    } catch (error: unknown) {
      this.error = true;
    } finally {
      this.loadingService.hide();
    }
  }

  // Funcao para carregar detalhes dos paises fronteiricos
  async loadBorderCountries(borders: string[]) {
    this.loadingService.show();
    try {
      for (const code of borders) {
        if (!this.borderCountries[code]) {
          const data = await firstValueFrom(
            this.countriesService.getCountryByCode(code)
          );

          if (data?.length) {
            this.borderCountries[code] = data[0];
          }

        }
      }
    } catch (err) {
      console.error('Error loading border countries', err);
    } finally {
      this.loadingService.hide();
    }
  }

// Funcao para voltar para a pagina anterior
  goBack() {
    const previous = this.navigationService.pop();

    if (previous) {
      this.router.navigate(['/countries', previous]);
    } else {
      this.router.navigate(['/countries']);
    }
  }

  // Funcao para obter lista de idiomas
  getLanguagesList(languages: any): string[] {
    return languages ? Object.values(languages) : [];
  }

  // Funcao para obter lista de moedas
  getCurrenciesList(currencies: any): { name: string; symbol: string }[] {
    if (!currencies) return [];
    return Object.values(currencies);
  }

  // Funcao para gerar URL do OpenStreetMap
  getMapUrl(): SafeResourceUrl | string {
    if (this.country?.latlng && this.country.latlng.length === 2) {
      const [lat, lng] = this.country.latlng;
      // URL do OpenStreetMap com zoom e marcador
      const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 10}%2C${lat - 10}%2C${lng + 10}%2C${lat + 10}&layer=mapnik&marker=${lat}%2C${lng}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
    }
    return '';
  }

  // Funcao para abrir o mapa em tela cheia
  openFullMap() {
    if (this.country?.latlng && this.country.latlng.length === 2) {
      const [lat, lng] = this.country.latlng;
      const mapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=10/${lat}/${lng}`;
      window.open(mapUrl, '_blank');
    }
  }

  // Funcao para buscar bandeira do pais fronteirico
  getBorderFlag(borderCode: string): string {
    return this.borderCountries[borderCode]?.flags?.png ?? '';
  }

  // Funcao para buscar nome do pais fronteirico
  getBorderCountryName(borderCode: string): string {
    return this.borderCountries[borderCode]?.name?.common ?? borderCode;
  }

  // Funcao para ver pais fronteirico
  viewBorderCountry(borderCode: string) {
    this.router.navigate(['/countries', borderCode]);
  }

  // Fallback para erro de imagem
  onBorderFlagError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'no-image.jpg';
  }
}
