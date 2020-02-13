import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ProfilesService } from '../core/services/profiles.service';
import { catchError } from 'rxjs/operators';
import { Profile } from '../core/models/profile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<Profile> {
  constructor(
    private profilesService: ProfilesService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.profilesService.get(route.params.username).pipe(
      catchError(err => {
        return this.router.navigateByUrl('/');
      })
    );
  }
}
