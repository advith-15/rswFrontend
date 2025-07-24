import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Use the same interface from your SearchResultsComponent
export interface SearchResult {
  id: string;
  partNumber: string;
  name: string;
  system: string;
  modelName: string;
  comments: string;
  notes: string;
  releaseDate: string;
  summary: string;
  selected?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  // A BehaviorSubject holds the current list of selected items.
  private selectedItemsSubject = new BehaviorSubject<SearchResult[]>([]);

  // Expose the list as an observable for components to subscribe to.
  public selectedItems$: Observable<SearchResult[]> = this.selectedItemsSubject.asObservable();

  constructor() { }

  // Toggles the selection for a given item
  toggleSelection(item: SearchResult): void {
    const currentSelection = this.selectedItemsSubject.getValue();
    const itemIndex = currentSelection.findIndex(i => i.id === item.id);

    if (itemIndex > -1) {
      // Item is already selected, so remove it
      currentSelection.splice(itemIndex, 1);
    } else {
      // Item is not selected, so add it
      currentSelection.push(item);
    }

    // Broadcast the new selection list to all subscribers
    this.selectedItemsSubject.next([...currentSelection]);
  }

  // Checks if an item is currently selected
  isSelected(item: SearchResult): boolean {
    return this.selectedItemsSubject.getValue().some(i => i.id === item.id);
  }

  // Clears the entire selection
  clearSelection(): void {
    this.selectedItemsSubject.next([]);
  }

  // Gets the current number of selected items
  getSelectedCount(): number {
    return this.selectedItemsSubject.getValue().length;
  }
}