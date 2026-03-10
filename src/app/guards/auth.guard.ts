import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionsService } from '../services/permissions.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const permissionsService = inject(PermissionsService);

  if (permissionsService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
