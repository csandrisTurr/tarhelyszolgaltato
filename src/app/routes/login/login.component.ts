import { Component, Input } from '@angular/core';
import { Password, PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    InputTextModule,
    FormsModule,
    Button,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  pw: string = '';
}
