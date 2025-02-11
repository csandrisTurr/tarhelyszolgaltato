import { Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { RootComponent } from './routes/root/root.component';
import { authGuard } from './utils/auth.guard';
import { UsersComponent } from './routes/users/users.component';
import { adminGuard } from './utils/admin.guard';
import { SubscriptionsComponent } from './routes/subscriptions/subscriptions.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: RootComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    canActivate: [authGuard, adminGuard],
  },
];
