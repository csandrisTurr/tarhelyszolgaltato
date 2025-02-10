import { Component, Inject, Input } from '@angular/core';
import { Password, PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ApiService } from '../../utils/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    InputTextModule,
    FormsModule,
    Button,
    FloatLabelModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private readonly apiService: ApiService) {}

  email: string = '';
  pw: string = '';

  async submit() {
    const res = await this.apiService.post('auth/login', {
      email: this.email,
      password: this.pw,
    });

    localStorage.setItem('token', res.data.token);
  }
}
