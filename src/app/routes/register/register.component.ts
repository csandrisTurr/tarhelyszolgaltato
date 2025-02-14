import { Component } from '@angular/core';
import { ApiService } from '../../utils/api.service';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    PasswordModule,
    InputTextModule,
    FormsModule,
    Button,
    FloatLabelModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private readonly apiService: ApiService, private readonly router: Router) {}

  name: string = '';
  email: string = '';
  pw: string = '';
  domain: string = '';

  async submit() {
    await this.apiService.post('auth/register', {
      name: this.name,
      email: this.email,
      password: this.pw,
      domain: this.domain,
    });

    this.router.navigateByUrl('/login');
  }
}
