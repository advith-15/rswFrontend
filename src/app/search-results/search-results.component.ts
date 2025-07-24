import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator
import { SelectionService, SearchResult } from '../selection.service';
import { FilterData } from '../filters/filters.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnChanges {
  @Input() activeFilters: FilterData | null = null;

  searchQuery: string = '';
  sortBy: string = 'relevance';
  hoveredCard: string | null = null;
  currentPage: number = 1;
  resultsPerPage: number = 6;
  totalPages: number = 1;
  
  suggestions: string[] = [];
  showSuggestions = false;

  // The URL for the local Node.js server that will bridge to Ollama
  readonly LOCAL_API_URL = 'http://localhost:3000/generate-summary';

  loadingSummaries: { [id: string]: boolean } = {};

  sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'date', label: 'Date' },
    { value: 'name', label: 'Name' },
    { value: 'partNumber', label: 'Part Number' }
  ];

  allResults: SearchResult[] = [
    { id: '453182736450', partNumber: '453182736450', name: 'Voltage Controller', system: 'Affiniti', modelName: '47', releaseDate: '2023-01-15', selected: false, comments: 'Rev A. Initial commercial release for the Affiniti 47 platform.', notes: 'Standard voltage controller. Ensure proper grounding during installation.', summary: '' },
    { id: '453918374659', partNumber: '453918374659', name: 'Voltage Controller', system: 'Affiniti', modelName: '47', releaseDate: '2023-08-20', selected: false, comments: 'Rev B. Updated silkscreen layout and improved capacitor C3 for better thermal performance.', notes: 'Compatible with software v2.1.x and later. Supersedes Rev A.', summary: '' },
    { id: '453110938477', partNumber: '453110938477', name: 'Voltage Controller', system: 'Affiniti', modelName: '47', releaseDate: '2024-04-10', selected: false, comments: 'Rev C. Low power consumption variant. Reduces idle power draw by 15%.', notes: 'Recommended for battery-operated mobile configurations of the Affiniti 47 system.', summary: '' },
    { id: '453582109374', partNumber: '453582109374', name: 'Capacitor Module', system: 'Affiniti', modelName: '47', releaseDate: '2022-11-05', selected: false, comments: 'Initial release. Standard 100uF capacitance for main power rail.', notes: 'Handle with care due to high discharge potential. Use insulated tools.', summary: '' },
    { id: '453625109384', partNumber: '453625109384', name: 'Capacitor Module', system: 'Affiniti', modelName: '47', releaseDate: '2023-05-22', selected: false, comments: 'High-endurance model with improved dielectric material for longer operational life.', notes: 'Rated for 20,000 charge/discharge cycles. Ideal for high-use environments.', summary: '' },
    { id: '453710382940', partNumber: '453710382940', name: 'Capacitor Module', system: 'Affiniti', modelName: '47', releaseDate: '2024-01-30', selected: false, comments: 'Compact variant, 30% smaller footprint for tight installations.', notes: 'Requires adapter bracket P/N 4599-AB-105 for mounting in standard slots.', summary: '' },
    { id: '453982104573', partNumber: '453982104573', name: 'Interface Module', system: 'Affiniti', modelName: '47', releaseDate: '2023-02-18', selected: false, comments: 'Standard dual-port ethernet and USB 2.0 interface module.', notes: 'Ensure network cables are properly shielded to avoid interference.', summary: '' },
    { id: '453338592018', partNumber: '453338592018', name: 'Interface Module', system: 'Affiniti', modelName: '47', releaseDate: '2023-10-01', selected: false, comments: 'Adds fiber optic (SFP) port for high-speed, long-distance networking.', notes: 'Requires SFP transceiver, sold separately. Not hot-swappable.', summary: '' },
    { id: '453258810934', partNumber: '453258810934', name: 'Processing Unit', system: 'Affiniti', modelName: '47', releaseDate: '2023-03-12', selected: false, comments: 'Base model CPU with 4 cores. Suitable for standard imaging modes.', notes: 'Heatsink and fan assembly must be inspected annually for dust.', summary: '' },
    { id: '453502817462', partNumber: '453502817462', name: 'Processing Unit', system: 'Affiniti', modelName: '47', releaseDate: '2024-02-25', selected: false, comments: 'High-performance 8-core CPU with hardware acceleration for elastography.', notes: 'Requires system software v4.0 or later to utilize all cores and features.', summary: '' },
    { id: '453991208374', partNumber: '453991208374', name: 'Processing Unit', system: 'Affiniti', modelName: '47', releaseDate: '2024-06-01', selected: false, comments: 'GPU-integrated model for advanced 3D/4D image rendering.', notes: 'Liquid cooling system is highly recommended for this unit.', summary: '' },
    { id: '453750281335', partNumber: '453750281335', name: 'Memory Controller', system: 'Affiniti', modelName: '47', releaseDate: '2022-09-14', selected: false, comments: 'Supports up to 16GB of DDR4 RAM. No ECC support.', notes: 'Use RAM modules from approved vendor list only to ensure compatibility.', summary: '' },
  ];

  filteredResults: SearchResult[] = [];

  constructor(private http: HttpClient, public selectionService: SelectionService) {}

  ngOnInit(): void {
    this.applyFilters();
    this.selectionService.clearSelection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeFilters']) {
      this.applyFilters();
    }
  }

  onCardHover(resultId: string): void {
    this.hoveredCard = resultId;
    const result = this.filteredResults.find(r => r.id === resultId);
    // Only fetch summary if it doesn't already exist and is not currently loading
    if (result && !result.summary && !this.loadingSummaries[resultId]) {
      this.loadingSummaries[resultId] = true;
      this.generateSummary(result.comments, result.notes).subscribe({
        next: (summaryText) => {
          result.summary = summaryText;
          this.loadingSummaries[resultId] = false;
        },
        error: (err) => {
          console.error("Failed to get summary from local server", err);
          result.summary = 'Error: Could not connect to local LLM server.';
          this.loadingSummaries[resultId] = false;
        }
      });
    }
  }
  
  private generateSummary(comments: string, notes: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { comments, notes };

    // Post to our local server and expect a response like { summary: "..." }
    return this.http.post<{ summary: string }>(this.LOCAL_API_URL, body, { headers }).pipe(
      map(response => response.summary) // Use the map operator to extract the summary string
    );
  }

  onCardLeave(): void { this.hoveredCard = null; }

  updateSuggestions(): void {
    if (this.searchQuery.length > 1) {
      const queryLower = this.searchQuery.toLowerCase();
      const matchedSuggestions = new Set<string>();
      this.allResults.forEach(result => {
        if (result.name.toLowerCase().includes(queryLower)) {
          matchedSuggestions.add(result.name);
        }
        if (result.partNumber.toLowerCase().includes(queryLower)) {
          matchedSuggestions.add(result.partNumber);
        }
      });
      this.suggestions = Array.from(matchedSuggestions).slice(0, 5);
      this.showSuggestions = true;
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  selectSuggestion(suggestion: string): void {
    this.searchQuery = suggestion;
    this.showSuggestions = false;
    this.applyFilters();
  }

  onSearch(): void {
    this.showSuggestions = false;
    this.applyFilters();
  }

  onCheckboxChange(result: SearchResult, event: Event): void {
    this.selectionService.toggleSelection(result);
    event.stopPropagation();
  }

  toggleSelectAll(): void {
    const currentPageResults = this.getCurrentPageResults();
    const allOnPageSelected = this.isAllCurrentPageSelected();
    currentPageResults.forEach(result => {
      const isSelected = this.selectionService.isSelected(result);
      if (allOnPageSelected && isSelected) {
        this.selectionService.toggleSelection(result);
      } else if (!allOnPageSelected && !isSelected) {
        this.selectionService.toggleSelection(result);
      }
    });
  }

  isAllCurrentPageSelected(): boolean {
    const currentPageResults = this.getCurrentPageResults();
    return currentPageResults.length > 0 && currentPageResults.every(result => this.selectionService.isSelected(result));
  }

  onSortChange(): void {
    this.sortResults();
    this.updatePagination();
  }

  getCurrentPageResults(): SearchResult[] {
    const startIndex = (this.currentPage - 1) * this.resultsPerPage;
    const endIndex = startIndex + this.resultsPerPage;
    return this.filteredResults.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    return pages;
  }

  private applyFilters(): void {
    const filters = this.activeFilters;
    this.filteredResults = this.allResults.filter(result => {
      const searchLower = this.searchQuery.toLowerCase();
      const textMatch = !this.searchQuery || (
        result.name.toLowerCase().includes(searchLower) ||
        result.partNumber.toLowerCase().includes(searchLower) ||
        result.comments.toLowerCase().includes(searchLower) ||
        result.notes.toLowerCase().includes(searchLower) ||
        result.system.toLowerCase().includes(searchLower) ||
        result.modelName.toLowerCase().includes(searchLower)
      );
      if (!filters) {
        return textMatch;
      }
      const filterMatch =
        (!filters.partNumber || result.partNumber === filters.partNumber) &&
        (!filters.assemblyName || result.name === filters.assemblyName) &&
        (!filters.modelNumber || result.modelName === filters.modelNumber) &&
        (!filters.modality || result.system === filters.modality);
      return textMatch && filterMatch;
    });
    this.sortResults();
    this.currentPage = 1;
    this.updatePagination();
  }

  private sortResults(): void {
    this.filteredResults.sort((a, b) => {
      switch (this.sortBy) {
        case 'date':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'partNumber':
          return a.partNumber.localeCompare(b.partNumber);
        case 'relevance':
        default:
          return 0;
      }
    });
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredResults.length / this.resultsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }
  }
}
