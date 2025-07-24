import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectionService, SearchResult } from '../selection.service'; // Adjust path if needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-bar',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit, OnDestroy {
  // System information
  systemId: string = '100373386';
  location: string = 'EMEA - IBE - Spain - Espirinado';
  caseNumber: string = '0124682519';

  // Status information
  activeContract: boolean = true;
  serialNumber: string = 'US123D1324';
  systemType: string = 'Affinity';
  modelName: string = '47';
  modelNumber: string = '795208';
  cartType: string = 'B.0';

  // Local state for selected parts
  public selectedParts: SearchResult[] = [];
  
  // FIX 1: Added the '!' definite assignment assertion.
  // This tells TypeScript "Don't worry, I will definitely assign a value to this property later (in ngOnInit)."
  private selectionSubscription!: Subscription;

  constructor(private selectionService: SelectionService) { }

  ngOnInit(): void {
    this.selectionSubscription = this.selectionService.selectedItems$.subscribe(parts => {
      this.selectedParts = parts;
    });
  }

  onLogViewerClick(): void {
    console.log('Log Viewer clicked');
    window.open('assets/log_viewer.html', '_blank');
  }

  onOpenInPRSPortalClick(): void {
    console.log('Open in PRS Portal clicked');
    window.open('assets/prs_portal.html', '_blank');
  }

  onCaseHistoryAnalyserClick(): void {
    console.log('Case History Analyser clicked');
    window.open('assets/case_history.html', '_blank');
  }

  onPrintClick(): void {
    if (this.selectedParts.length === 0) {
      console.warn('Print clicked, but no parts are selected.');
      return;
    }

    const printContent = this.selectedParts.map(part => `
      <div class="part-entry">
        <h3>${part.name}</h3>
        <p><strong>Part Number:</strong> ${part.partNumber}</p>
        <p><strong>System:</strong> ${part.system}</p>
        <p><strong>Model:</strong> ${part.modelName}</p>
        <p><strong>Release Date:</strong> ${part.releaseDate}</p>
        <p><strong>Comments:</strong> ${part.comments}</p>
        <p><strong>Comments:</strong> ${part.notes}</p>
        <p><strong>Summary:</strong> ${part.summary}</p>
      </div>
    `).join('');

    const styles = `<style>body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 20px; } .part-entry { border-bottom: 1px solid #ccc; padding-bottom: 15px; margin-bottom: 15px; } h3 { color: #2c3e50; } p { margin: 5px 0; }</style>`;

    const printWindow = window.open('', '_blank');

   
    if (printWindow) {
      printWindow.document.write(`<html><head><title>Print Selected Parts</title>${styles}</head><body><h1>Selected Parts Details</h1>${printContent}</body></html>`);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    } else {
      // Handle the case where the popup was blocked
      alert('Could not open print window. Please disable your popup blocker and try again.');
    }
  }

  ngOnDestroy(): void {
    if (this.selectionSubscription) {
      this.selectionSubscription.unsubscribe();
    }
  }
}