import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const loggedIn = !!localStorage.getItem('token');

  if (!loggedIn) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
