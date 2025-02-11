import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './routes/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo';
  constructor(private readonly router: Router) {}

  navbarPublicRoutes = () => !localStorage.getItem('token');

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  admin() {
    return localStorage.getItem('admin') == '1';
  }
}
