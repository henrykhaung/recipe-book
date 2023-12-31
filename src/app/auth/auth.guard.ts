import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuthenticated = user ? true : false;
        if (isAuthenticated) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   if (this.authService.isLoggedIn()) {
  //     // User is logged in, redirect to HomeUserModule
  //     return this.router.parseUrl('/' + next.params.name + '/home');
  //   } else {
  //     // User is not logged in, redirect to HomeModule
  //     return this.router.parseUrl('/home');
  //   }
  // }
}
