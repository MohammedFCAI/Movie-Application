import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const _router = inject(Router);
  if(localStorage.getItem('user') != null) {
    return true;
  }
  
  _router.navigate(['login']);
  return false;
};
