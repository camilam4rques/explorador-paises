import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../../core/services/countries.service';
import { Country } from '../../../../core/models/country.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading.service';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog';

import { finalize } from 'rxjs';


@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent, ConfirmDialogComponent],
  templateUrl: './countries-list.html',
  styleUrls: ['./countries-list.css']
})
export class CountriesList implements OnInit {

  countries: Country[] = [];// Lista completa de países
  filteredCountries: Country[] = [];// Lista filtrada de países
  uniqueRegions: string[] = [];// Regiões únicas para o filtro
  pagedCountries: any[] = [];
  error: boolean = false;// Estado de erro
  selectedRegion: string = '';// Região selecionada no filtro
  nameFilter: string = '';// Filtro de nome
  capitalFilter: string = '';// Filtro de capital
  languageFilter: string = '';// Filtro de idioma
  populationFilter: string = '';// Filtro de população
  currentPage: number = 1;
  itemsPerPage: number = 50;
  totalPages: number = 1;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  Math = Math;

  // Adicione estas propriedades na classe CountriesList
  showConfirmDialog = false;
  confirmDialogMessage = '';
  confirmDialogTitle = '';
  confirmDialogConfirmText = '';
  confirmDialogCancelText = '';

  constructor(
    private service: CountriesService,
    private router: Router,
    private loadingService: LoadingService,
  ) { }

  //funcao inicial
  ngOnInit() {
    this.loadCountries();
  }

  // Carrega a lista de paises da API
  loadCountries() {
    this.error = false;
    this.loadingService.show();

    this.service.getAllCountries()
      .pipe(
        finalize(() => { this.loadingService.hide(); })
      )
      .subscribe({
        next: (data) => {
          if (!data || !data.length) {
            return;
          }
          this.countries = data;
          this.filteredCountries = [...this.countries];

          this.extractRegions();
          this.currentPage = 1;
          this.updatePagedCountries();
        },
        error: (error: unknown) => {
          this.error = true;
        }
      });
  }

  reloadCountries() {
    if(this.hasActiveFilters()) {
      this.confirmDialogTitle = 'Confirm action';
      this.confirmDialogMessage = 'This action will clear all filters. Are you sure you want to continue?';
      this.confirmDialogConfirmText = 'Continue';
      this.confirmDialogCancelText = 'Cancel';

      this.showConfirmDialog = true;
      return;
    }else{
      this.loadCountries();
    }
  }

  onConfirmReload() {
    this.showConfirmDialog = false;
    this.clearAllFilters();
    this.loadCountries();
  }

  onCancelReload() {
    this.showConfirmDialog = false;
  }

  // Extrai as regioes da lista de paises para popular o filtro de regiao
  private extractRegions() {
    if (!this.countries || !this.countries.length) {
      this.uniqueRegions = [];
      return;
    }

    const regions = new Set(
      this.countries.map(c => c.region).filter(region => region && region.trim() !== '')
    );

    this.uniqueRegions = Array.from(regions).sort();
  }

  //Filtra a lista mostrando apenas países que correspondem ao texto digitado
  filterByName(event: any) {
    this.nameFilter = event.target.value.toLowerCase().trim();
    this.applyFilters();
  }

  //Filtra paises cuja capital corresponde ao texto digitado
  filterByCapital(event: any) {
    this.capitalFilter = event.target.value.toLowerCase();
    this.applyFilters();
  }

  //Filtra paises que possuem o idioma correspondente ao texto digitado
  filterByLanguage(event: any) {
    this.languageFilter = event.target.value.toLowerCase();
    this.applyFilters();
  }

  //Filtra a população mostrando apenas paises com populacao de acordo com a opcao selecionada
  filterByPopulation(event: any) {
    this.populationFilter = event.target.value;
    this.applyFilters();
  }

  //Filtra paises que pertencem a regiao selecionada
  filterByRegion(event: any) {
    this.selectedRegion = event.target.value;
    this.applyFilters();
  }

  // Verifica se tem algum filtro ativo para mostrar o botao de limpar filtros
  hasActiveFilters(): boolean {
    return !!(
      this.nameFilter ||
      this.capitalFilter ||
      this.languageFilter ||
      this.selectedRegion ||
      this.populationFilter
    );
  }

  //Aplica todos os filtros combinados
  applyFilters() {
    if (!this.countries || !this.countries.length) {
      this.filteredCountries = [];
      this.updatePagedCountries();
      return;
    }

    this.filteredCountries = this.countries.filter(country => {
      // Filtro por nome (se existir)
      if (this.nameFilter) {
        const nmPais = country.name.common.toLowerCase();
        if (!nmPais.includes(this.nameFilter)) {
          return false;
        }
      }

      // Filtro por capital
      if (this.capitalFilter) {
        const nmCapital = country.capital?.[0] || '';
        if (!nmCapital.toLowerCase().includes(this.capitalFilter)) {
          return false;
        }
      }

      // Filtro por idioma
      if (this.languageFilter) {
        const nmIdioma = this.getLanguagesList(country.languages).toLowerCase();
        if (!nmIdioma.includes(this.languageFilter)) {
          return false;
        }
      }

      // Filtro por região
      if (this.selectedRegion && country.region !== this.selectedRegion) {
        return false;
      }

      // Filtro por população
      if (this.populationFilter) {
        switch (this.populationFilter) {
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

    // Aplica ordenacao
    this.applyPopulationSort();

    // Reseta para primeira pagina sempre que um filtro e aplicado
    this.currentPage = 1;
    this.updatePagedCountries();
  }

  // Limpa todos os filtros e mostra a lista completa de paises
  clearAllFilters() {
    this.nameFilter = '';
    this.capitalFilter = '';
    this.languageFilter = '';
    this.selectedRegion = '';
    this.populationFilter = '';

    if (this.countries && this.countries.length) {
      this.filteredCountries = [...this.countries];
      this.currentPage = 1;
      this.updatePagedCountries();
    }
  }

  //Reseta todos os filtros para o estado inicial (sem filtros)
  resetFilters() {
    this.clearAllFilters();
  }

  // Método para navegar para a tela de detalhes
  viewCountryDetails(country: any) {
    this.router.navigate(['/countries', country.cca3]);
  }

  // Se quiser manter o showCountryDetails para o clique na bandeira
  showCountryDetails(country: any) {
    this.viewCountryDetails(country); // Reaproveita o mesmo método
  }

  // Metodos de paginação
  private updatePagedCountries() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedCountries = this.filteredCountries.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredCountries.length / this.itemsPerPage);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }

  }

  // Metodo para mudar de página
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedCountries();
    }
  }

  // Metodo para mudar a quantidade de itens por pagina
  changeItemsPerPage(event: any) {
    this.itemsPerPage = parseInt(event.target.value);
    this.currentPage = 1;
    this.updatePagedCountries();
  }

  // Metodo para obter as paginas visiveis na paginacao
  getVisiblePages(): number[] {
    const maxVisiblePages = 5;
    const pages: number[] = [];

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, this.currentPage - 2);
      let end = Math.min(this.totalPages, start + maxVisiblePages - 1);

      if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  }

  // Aplica ordenacao por populacao com base na opcao selecionada
  private applyPopulationSort() {
    if (!this.populationFilter || !this.filteredCountries.length)
      return;

    if (this.populationFilter === 'asc') {
      this.filteredCountries.sort((a, b) => a.population - b.population);
    } else if (this.populationFilter === 'desc') {
      this.filteredCountries.sort((a, b) => b.population - a.population);
    }
  }

  // Funcao de trackBy para otimizar a renderizacao da lista
  trackByCode(index: number, country: Country): string {
    if (!country || !country.cca3) {
      return `index-${index}`;
    }
    return country.cca3;
  }

  //Converte o objeto de idiomas para uma lista formatada em string
  getLanguagesList(languages: any): string {
    if (!languages) return 'Não informado';
    if (Object.keys(languages).length === 0) return 'Não informado';
    return Object.values(languages).join(', ');
  }

  // Metodo para ordenar a lista de paises por uma coluna especifica
  sortBy(column: string) {

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredCountries.sort((a: any, b: any) => {
      let valueA: any;
      let valueB: any;

      switch (column) {
        case 'name':
          valueA = a.name.common;
          valueB = b.name.common;
          break;

        case 'population':
          valueA = a.population;
          valueB = b.population;
          break;

        case 'region':
          valueA = a.region;
          valueB = b.region;
          break;

        case 'capital':
          valueA = a.capital?.[0] || '';
          valueB = b.capital?.[0] || '';
          break;

        default:
          return 0;
      }

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;

      return 0;
    });

    this.updatePagedCountries();
  }

  // Metodo para obter o icone de ordenacao com base na coluna e direcao de ordenacao
  getSortIcon(column: string) {

    if (this.sortColumn !== column) {
      return '⇅';
    }

    return this.sortDirection === 'asc' ? '▲' : '▼';
  }

  // Formata o numero de populacao para o formato brasileiro
  formatNumber(value: number): string {
    return value.toLocaleString('pt-BR');
  }

}
