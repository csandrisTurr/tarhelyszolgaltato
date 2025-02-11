import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  return localStorage.getItem('admin')! == '1';
};
