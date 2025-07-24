import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with all results', () => {
    expect(component.filteredResults.length).toBe(component.allResults.length);
  });

  it('should filter results based on search query', () => {
    component.searchQuery = 'Power';
    component.onSearch();
    expect(component.filteredResults.length).toBe(1);
    expect(component.filteredResults[0].name).toContain('Power');
  });

  it('should sort results by date', () => {
    component.sortBy = 'date';
    component.onSortChange();
    expect(component.filteredResults[0].releaseDate).toBe('2021-01-22');
  });

  it('should sort results by name', () => {
    component.sortBy = 'name';
    component.onSortChange();
    expect(component.filteredResults[0].name).toBe('Capacitor Module');
  });

  it('should handle card hover', () => {
    const resultId = '453361216587';
    component.onCardHover(resultId);
    expect(component.hoveredCard).toBe(resultId);
  });

  it('should handle card leave', () => {
    component.hoveredCard = '453361216587';
    component.onCardLeave();
    expect(component.hoveredCard).toBeNull();
  });
});
