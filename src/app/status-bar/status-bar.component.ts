import { Component } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent {
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

  constructor() { }

  onLogViewerClick(): void {
    console.log('Log Viewer clicked');
    window.open('assets/log_viewer.html', '_blank')
    // Add navigation logic here
    // this.router.navigate(['/log-viewer']);
  }

  onOpenInPRSPortalClick(): void {
    console.log('Open in PRS Portal clicked');
    window.open('assets/prs_portal.html', '_blank')

    // Add navigation logic here
    // window.open('https://prs-portal.com', '_blank');
  }

  onCaseHistoryAnalyserClick(): void {
    console.log('Case History Analyser clicked');
    window.open('assets/case_history.html', '_blank')
    // Add navigation logic here
    // this.router.navigate(['/case-history-analyser']);
  }

  onPrintClick(): void {
    console.log('Print clicked');
    // Add print functionality
    window.print();
  }

  onSystemIdClick(): void {
    console.log('System ID clicked');
    // Add system details navigation
  }
}