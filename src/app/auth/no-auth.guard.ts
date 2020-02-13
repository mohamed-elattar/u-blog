import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { take, map, tap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(
      take(1),
      tap(res => console.log('no auth res after take', res)),
      map(isAuth => !isAuth),
      tap(res => console.log('no auth res after map', res))
    );
  }
}
