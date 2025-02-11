import { Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { RootComponent } from './routes/root/root.component';
import { authGuard } from './utils/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
