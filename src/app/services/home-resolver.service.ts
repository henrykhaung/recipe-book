import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class HomeResolver implements Resolve<string> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> {
    if (this.authService.isLoggedIn()) {
      console.log('like hlelo???');
      return of('home-user');
    } else {
      console.log('like hlelo??? not logged in');
      return of('home');
    }
  }
}
