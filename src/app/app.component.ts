import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FiltersComponent, FilterData } from './filters/filters.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    StatusBarComponent,
    FiltersComponent,
    SearchResultsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rswFrontend';
  currentFilters: FilterData | null = null;

  constructor(public router: Router) {}

  isServicePlanRoute(): boolean {
    return this.router.url.includes('/create-service-plan');
  }

  onFiltersChanged(filters: FilterData): void {
    this.currentFilters = filters;
  }
}