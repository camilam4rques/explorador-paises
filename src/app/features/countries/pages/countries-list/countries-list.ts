import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CountriesService } from '../../../../core/services/countries';
import { Country } from '../../../../core/models/country.model';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countries-list.html',
  styleUrls: ['./countries-list.css']
})
export class CountriesList implements OnInit {
  // Propriedades principais
  countries: Country[] = [];              // Lista completa de países
  filteredCountries: Country[] = [];       // Lista filtrada de países
  uniqueRegions: string[] = [];            // Regiões únicas para o filtro
  loading = true;                          // Estado de carregamento
  error = false;                           // Estado de erro
  selectedRegion: string = '';              // Região selecionada no filtro

  // Propriedades para os filtros
  nameFilter: string = '';                  // Filtro de nome
  capitalFilter: string = '';                // Filtro de capital
  languageFilter: string = '';                // Filtro de idioma
  populationFilter: string = '';              // Filtro de população

  constructor(
    private service: CountriesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.loading = true;
    this.error = false;

    this.service.getAllCountries().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);

        if (!data || !data.length) {
          console.warn('Nenhum dado recebido');
          this.loading = false;
          this.cdr.detectChanges();
          return;
        }

        this.countries = data.slice(0, 50);
        this.filteredCountries = [...this.countries];
        this.extractUniqueRegions();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro detalhado:', err);
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  async reloadCountries() {
    if (this.loading) return;

    this.loading = true;
    this.error = false;
    this.clearAllFilters();

    try {
      const data = await lastValueFrom(this.service.getAllCountries()) as Country[];

      if (!data || !Array.isArray(data)) {
        throw new Error('Dados inválidos');
      }

      if (data.length === 0) {
        console.warn('Dados vazios');
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }

      this.countries = data.slice(0, 50);
      this.filteredCountries = [...this.countries];
      this.extractUniqueRegions();
      this.loading = false;
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Erro no reload:', err);
      this.error = true;
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  extractUniqueRegions() {
    if (!this.countries || !this.countries.length) {
      this.uniqueRegions = [];
      return;
    }

    const regions = new Set(
      this.countries
        .map(country => country.region)
        .filter(region => region && region.trim() !== '')
    );

    this.uniqueRegions = Array.from(regions).sort();
  }

  /**
   * FILTRO POR NOME - VERSÃO OTIMIZADA
   * Filtra a lista mostrando apenas países que correspondem ao texto digitado
   */
  filterByName(event: any) {
    // Pega o valor digitado e converte para minúsculas
    const searchTerm = event.target.value.toLowerCase().trim();
    this.nameFilter = searchTerm;

    console.log('Filtrando por nome:', searchTerm);

    // Fast return: Se o termo de busca estiver vazio, mostra todos os países
    if (!searchTerm) {
      console.log('Termo vazio - mostrando todos os países');
      this.filteredCountries = [...this.countries];
      this.cdr.detectChanges();
      return;
    }

    // Filtra os países que contêm o termo de busca no nome
    this.filteredCountries = this.countries.filter(country => {
      const countryName = country.name.common.toLowerCase();
      const matches = countryName.includes(searchTerm);

      // Log para debug (opcional - remover em produção)
      if (matches) {
        console.log(`✓ País encontrado: ${country.name.common}`);
      }

      return matches;
    });

    console.log(`Total de países encontrados: ${this.filteredCountries.length}`);

    // Força a atualização da view
    this.cdr.detectChanges();
  }

  /**
   * Versão alternativa com debounce para melhor performance
   * (opcional - usar se estiver digitando muito rápido)
   */
  private searchTimeout: any;

  filterByNameWithDebounce(event: any) {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.filterByName(event);
    }, 300); // Aguarda 300ms após parar de digitar
  }

  filterByCapital(event: any) {
    this.capitalFilter = event.target.value.toLowerCase();
    this.applyFilters();
  }

  filterByLanguage(event: any) {
    this.languageFilter = event.target.value.toLowerCase();
    this.applyFilters();
  }

  filterByPopulation(event: any) {
    this.populationFilter = event.target.value;
    this.applyFilters();
  }

  filterByRegion(event: any) {
    this.selectedRegion = event.target.value;
    this.applyFilters();
  }

  /**
   * Aplica todos os filtros combinados
   */
  applyFilters() {
    if (!this.countries || !this.countries.length) {
      this.filteredCountries = [];
      this.cdr.detectChanges();
      return;
    }

    this.filteredCountries = this.countries.filter(country => {
      // Filtro por nome (se existir)
      if (this.nameFilter) {
        const countryName = country.name.common.toLowerCase();
        if (!countryName.includes(this.nameFilter)) {
          return false;
        }
      }

      // Filtro por capital
      if (this.capitalFilter) {
        const capital = country.capital?.[0] || '';
        if (!capital.toLowerCase().includes(this.capitalFilter)) {
          return false;
        }
      }

      // Filtro por idioma
      if (this.languageFilter) {
        const languages = this.getLanguagesList(country.languages).toLowerCase();
        if (!languages.includes(this.languageFilter)) {
          return false;
        }
      }

      // Filtro por região
      if (this.selectedRegion && country.region !== this.selectedRegion) {
        return false;
      }

      // Filtro por população
      if (this.populationFilter) {
        switch(this.populationFilter) {
          case 'million':
            if (country.population < 1000000) return false;
            break;
          case 'billion':
            if (country.population < 1000000000) return false;
            break;
        }
      }

      return true;
    });

    // Aplica ordenação se necessário
    this.applyPopulationSort();

    console.log(`Filtros aplicados - Resultados: ${this.filteredCountries.length}`);
    this.cdr.detectChanges();
  }

  private applyPopulationSort() {
    if (!this.populationFilter || !this.filteredCountries.length) {
      return;
    }

    if (this.populationFilter === 'asc') {
      this.filteredCountries.sort((a, b) => a.population - b.population);
    } else if (this.populationFilter === 'desc') {
      this.filteredCountries.sort((a, b) => b.population - a.population);
    }
  }

  hasActiveFilters(): boolean {
    return !!(
      this.nameFilter ||
      this.capitalFilter ||
      this.languageFilter ||
      this.selectedRegion ||
      this.populationFilter
    );
  }

  clearAllFilters() {
    this.nameFilter = '';
    this.capitalFilter = '';
    this.languageFilter = '';
    this.selectedRegion = '';
    this.populationFilter = '';

    if (this.countries && this.countries.length) {
      this.filteredCountries = [...this.countries];
    }

    console.log('Todos os filtros limpos');
    this.cdr.detectChanges();
  }

  showCountryDetails(country: Country) {
    const details = [
      `🌍 ${country.name.common}`,
      `🏛️ Capital: ${country.capital?.[0] || 'Não informada'}`,
      `👥 População: ${country.population.toLocaleString()}`,
      `🌎 Região: ${country.region}`,
      `🗣️ Idiomas: ${this.getLanguagesList(country.languages)}`
    ].join('\n');

    alert(details);
  }

  trackByCode(index: number, country: Country): string {
    if (!country || !country.cca3) {
      return `index-${index}`;
    }
    return country.cca3;
  }

  getLanguagesList(languages: any): string {
    if (!languages) return 'Não informado';
    if (Object.keys(languages).length === 0) return 'Não informado';
    return Object.values(languages).join(', ');
  }

  resetFilters() {
    this.clearAllFilters();
  }
}
