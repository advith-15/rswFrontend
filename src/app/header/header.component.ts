import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // Sample employee data - you can replace this with actual data from a service
  employeeName: string = 'Advith Padyana';
  employeeId: string = '3206215013';
  
  constructor() { }

  onProfileClick() {
    // Handle profile click action
    console.log('Profile clicked');
    // You can add navigation logic here
  }

  onHelpClick() {
    // Handle help click action
    console.log('Help clicked');
    // You can add help modal or navigation logic here
  }

  onFeedbackClick() {
    // Handle feedback click action
    console.log('Feedback clicked');
    // You can add feedback modal or navigation logic here
    // Example: open feedback modal, navigate to feedback page, etc.
  }

  onLogoutClick() {
    // Handle logout click action
    console.log('Logout clicked');
    // You can add logout logic here
    // Example: clear user session, navigate to login page, etc.
    
    // Example logout implementation:
    // this.authService.logout();
    // this.router.navigate(['/login']);
  }
}