import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (authService.isLoggedIn()) {
    const userRole = authService.getUserRole();

    if (route.routeConfig?.path === 'admin' && userRole !== 'admin') {
      toastr.warning('You do not have access to this page.');
      router.navigate(['/']);
      return false;
    }

    if (route.routeConfig?.path === '' && userRole !== 'user') {
      toastr.warning('You do not have access to this page.');
      router.navigate(['/']);
      return false;
    }

    return true;
  } else {
    router.navigate(['/login']);
    toastr.warning('Please log in to access this page.');
    return false;
  }
};
