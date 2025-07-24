import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchResult } from '../selection.service';


@Component({
  selector: 'app-service-plan-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule
  ],
  templateUrl: './service-plan-dialog.component.html',
  styleUrls: ['./service-plan-dialog.component.css']
})
export class ServicePlanDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ServicePlanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedParts: SearchResult[] },
    private snackBar: MatSnackBar
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  showSuccess(): void {
    this.snackBar.open('Service plan confirmed successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
