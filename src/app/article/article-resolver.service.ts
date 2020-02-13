import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Article } from '../core/models/article.model';
import { ArticlesService } from '../core/services/articles.service';
import { Observable } from 'rxjs';
import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolverService implements Resolve<Article> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articlesService.get(route.params.slug).pipe(
      catchError(err => {
        return this.router.navigateByUrl('/');
      })
    );
  }
}
