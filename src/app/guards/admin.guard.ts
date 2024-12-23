import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === 'ADMIN') {
        return true;
      }
    }
  
  _router.navigate(['movies']);
  return false;
}
