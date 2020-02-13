import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Article } from '../core/models/article.model';
import { ArticlesService } from '../core/services/articles.service';
import { UserService } from '../core/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditableArticleResolverService implements Resolve<Article> {
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
      map(article => {
        if (
          this.userService.getCurrentUser().username === article.author.username
        ) {
          return article;
        } else {
          this.router.navigateByUrl('/');
        }
      }),
      catchError(err => this.router.navigateByUrl('/'))
    );
  }
}
