import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/Authentication/services/auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  auth.getMyInfo();

  return auth.isLoggedIn().pipe(
    tap(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(["/"]);
      }
    })
  )
};
