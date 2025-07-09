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
}