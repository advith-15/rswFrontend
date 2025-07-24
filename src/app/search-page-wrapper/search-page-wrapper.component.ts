import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent, FilterData } from '../filters/filters.component';
import { SearchResultsComponent } from '../search-results/search-results.component';

@Component({
  selector: 'app-search-page-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    FiltersComponent,
    SearchResultsComponent
  ],
  templateUrl: './search-page-wrapper.component.html',
  styleUrls: ['./search-page-wrapper.component.css'] // This line is added by the CLI
})
export class SearchPageWrapperComponent {
  // This property will hold the state of the filters
  currentFilters: FilterData | null = null;

  // This method is called when the FiltersComponent emits its (filtersChanged) event
  onFiltersUpdated(filters: FilterData): void {
    this.currentFilters = filters;
  }
}