import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ALL_PERMISSIONS, Permission, PermissionsService } from '../services/permissions.service';

export const permissionGuard: CanActivateFn = route => {
  const router = inject(Router);
  const permissionsService = inject(PermissionsService);
  const routePermissions = route.data['permissions'] as string | string[] | undefined;

  if (!routePermissions) {
    return true;
  }

  const rawPermissions = Array.isArray(routePermissions)
    ? routePermissions
    : [routePermissions];

  const permissionsToValidate = rawPermissions.filter((permission): permission is Permission =>
    (ALL_PERMISSIONS as readonly string[]).includes(permission)
  );

  if (permissionsToValidate.length === 0) {
    return true;
  }

  const hasAccess = permissionsService.hasAnyPermissions(permissionsToValidate);
  if (hasAccess) {
    return true;
  }

  return router.createUrlTree(['/home']);
};
