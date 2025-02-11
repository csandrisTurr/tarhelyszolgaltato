import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ApiService } from '../../utils/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    InputTextModule,
    FormsModule,
    Button,
    FloatLabelModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private readonly apiService: ApiService, private readonly router: Router) {}

  email: string = '';
  pw: string = '';

  async submit() {
    const res = await this.apiService.post('auth/login', {
      email: this.email,
      password: this.pw,
    });

    localStorage.setItem('token', res.data.token);
    this.router.navigateByUrl('/');
  }
}
