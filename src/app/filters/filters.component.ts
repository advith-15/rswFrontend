import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SelectionService } from '../selection.service';
import { ServicePlanDialogComponent } from '../service-plan-dialog/service-plan-dialog.component';

export interface FilterData {
  cartType: string;
  modelNumber: string;
  assemblyName: string;
  modality: string;
  partNumber: string;
  forwardUpgradable: boolean | null;
  backwardCompatible: boolean | null;
  [key: string]: string | boolean | null;
}

interface DropdownStates {
  cartType: boolean;
  modelNumber: boolean;
  assemblyName: boolean;
  modality: boolean;
  partNumber: boolean;
  forwardUpgradable: boolean;
  backwardCompatible: boolean;
  [key: string]: boolean;
}

interface FeedbackData {
  category: string;
  description: string;
  impact: string;
  urgency: string;
  role: string;
  contact: string;
}

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, MatSnackBarModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Output() filtersChanged = new EventEmitter<FilterData>();

  filters: FilterData = {
    cartType: '',
    modelNumber: '',
    assemblyName: '',
    modality: '',
    partNumber: '',
    forwardUpgradable: null,
    backwardCompatible: null
  };

  cartTypeOptions = ['B.0 (Log File)', 'A.0 (System File)', 'C.0 (Data File)', 'D.0 (Config File)'];
  modelNumberOptions = ['47'];
  modalityOptions = ['Affiniti'];

  assemblyNameOptions = [
    'Voltage Controller',
    'Capacitor Module',
    'Interface Module',
    'Processing Unit',
    'Memory Controller'
  ];

  partNumberOptions = [
    '453182736450',
    '453918374659',
    '453110938477',
    '453582109374',
    '453625109384',
    '453710382940',
    '453982104573',
    '453338592018',
    '453258810934',
    '453502817462',
    '453991208374',
    '453750281335',
    '453219874023'
  ];

  searchText: { [key: string]: string } = {};

  dropdownStates: DropdownStates = {
    cartType: false,
    modelNumber: false,
    assemblyName: false,
    modality: false,
    partNumber: false,
    forwardUpgradable: false,
    backwardCompatible: false
  };

  showFeedbackDialog = false;

  feedbackData: FeedbackData = {
    category: '',
    description: '',
    impact: '',
    urgency: '',
    role: '',
    contact: ''
  };

  constructor(
    public dialog: MatDialog,
    private selectionService: SelectionService,
    private snackBar: MatSnackBar
  ) {}

  onAddToServicePlanClick(): void {
    this.selectionService.selectedItems$.pipe(first()).subscribe(selectedParts => {
      if (selectedParts.length === 0) return;
      const dialogRef = this.dialog.open(ServicePlanDialogComponent, {
        width: '500px',
        data: { selectedParts }
      });

      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.selectionService.clearSelection();
        }
      });
    });
  }

  toggleDropdown(field: string): void {
    Object.keys(this.dropdownStates).forEach(key => {
      if (key !== field) {
        this.dropdownStates[key as keyof DropdownStates] = false;
      }
    });
    this.dropdownStates[field as keyof DropdownStates] = !this.dropdownStates[field as keyof DropdownStates];
  }

  selectOption(field: string, value: any): void {
    (this.filters as any)[field] = value;
    this.dropdownStates[field as keyof DropdownStates] = false;
    this.emitFilters();
  }

  applyFilters(): void {
    this.emitFilters();
  }

  clearFilters(): void {
    this.filters = {
      cartType: '',
      modelNumber: '',
      assemblyName: '',
      modality: '',
      partNumber: '',
      forwardUpgradable: null,
      backwardCompatible: null
    };
    this.emitFilters();
  }

  onCreateServicePlanClick(): void {
    window.open(`${window.location.origin}/create-service-plan`, '_blank');
  }

  onGiveFeedbackClick(): void {
    this.showFeedbackDialog = true;
    this.resetFeedbackForm();
  }

  closeFeedbackDialog(): void {
    this.showFeedbackDialog = false;
    this.resetFeedbackForm();
  }

  resetFeedbackForm(): void {
    this.feedbackData = {
      category: '',
      description: '',
      impact: '',
      urgency: '',
      role: '',
      contact: ''
    };
  }

  submitFeedback(): void {
    const { category, description, impact } = this.feedbackData;

    if (!category || !description.trim() || !impact) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Feedback submitted:', this.feedbackData);
    this.snackBar.open('Thank you for your feedback!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'custom-snackbar'
    });
    this.closeFeedbackDialog();
  }

  private emitFilters(): void {
    this.filtersChanged.emit({ ...this.filters });
  }

  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.filter-dropdown')) {
      Object.keys(this.dropdownStates).forEach(key => {
        this.dropdownStates[key as keyof DropdownStates] = false;
      });
    }
  }

  getFilterValue(key: string): string | boolean | null {
    return this.filters[key];
  }

  isDropdownOpen(key: string): boolean {
    return this.dropdownStates[key];
  }

  isFilterSelected(key: string, value: string | boolean): boolean {
    return this.filters[key] === value;
  }
}
