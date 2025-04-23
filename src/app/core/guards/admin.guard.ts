import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../features/Authentication/services/auth.service';
import { tap } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)

  return auth.isAdmin().pipe(
    tap(isAdmin => {
      if (!isAdmin) {
        router.navigate(["/ml"])
      }
    })
  );
};
