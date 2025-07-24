import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent, FilterData } from './filters.component';
import { SelectionService } from '../selection.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Mock for the SelectionService
class MockSelectionService {}

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 1. Import the standalone component, its dependencies, and testing modules
      imports: [
        FiltersComponent, 
        MatDialogModule,
        NoopAnimationsModule // Required for Material components
      ],
      // 2. Provide a mock for any services the component depends on
      providers: [
        { provide: SelectionService, useClass: MockSelectionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 3. Corrected test to match the actual initial state
  it('should initialize with default filter values', () => {
    expect(component.filters.cartType).toBe('');
    expect(component.filters.modelNumber).toBe('');
    expect(component.filters.assemblyName).toBe('');
    expect(component.filters.modality).toBe('');
    expect(component.filters.partNumber).toBe('');
    expect(component.filters.forwardUpgradable).toBeNull();
    expect(component.filters.backwardCompatible).toBeNull();
  });

  it('should have all dropdown states initially closed', () => {
    Object.values(component.dropdownStates).forEach(state => {
      expect(state).toBeFalsy();
    });
  });

  it('should toggle dropdown state when clicked', () => {
    const initialState = component.dropdownStates.cartType;
    component.toggleDropdown('cartType');
    expect(component.dropdownStates.cartType).toBe(!initialState);
  });

  it('should close other dropdowns when opening a new one', () => {
    component.toggleDropdown('cartType');
    component.toggleDropdown('modelNumber');

    expect(component.dropdownStates.cartType).toBeFalsy();
    expect(component.dropdownStates.modelNumber).toBeTruthy();
  });

  it('should select option and close dropdown', () => {
    const testValue = 'A.0 (System File)';
    component.selectOption('cartType', testValue);

    expect(component.filters.cartType).toBe(testValue);
    expect(component.dropdownStates.cartType).toBeFalsy();
  });

  // 4. Corrected test to call the right method and check the result
  it('should clear all filters when clearFilters is called', () => {
    // Set some initial values
    component.filters.cartType = 'A.0 (System File)';
    component.filters.assemblyName = 'Voltage Controller';

    // Call the method with no arguments
    component.clearFilters();

    // Expect the properties to be reset to their default state
    expect(component.filters.cartType).toBe('');
    expect(component.filters.assemblyName).toBe('');
  });
});