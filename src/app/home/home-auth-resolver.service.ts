import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { take, catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(private router: Router, private userService: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.userService.isAuthenticated.pipe(
      take(1),
      tap(res => console.log('home auth resolver res value:', res))
    );
  }
}
