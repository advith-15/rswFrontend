import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { StatusBarComponent } from './status-bar/status-bar.component';

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, StatusBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rswFrontend';
}
