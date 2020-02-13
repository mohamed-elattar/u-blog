import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/core/models/article.model';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {
  @Input() article: Article;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {}

  toggleFavorite() {
    this.isSubmitting = true;
    this.userService.isAuthenticated
      .pipe(
        concatMap(authenticated => {
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          }
          if (!this.article.favorited) {
            return this.articlesService.favorite(this.article.slug).pipe(
              tap(
                data => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                err => (this.isSubmitting = false)
              )
            );
          } else {
            return this.articlesService.unFavorite(this.article.slug).pipe(
              tap(
                data => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                err => (this.isSubmitting = false)
              )
            );
          }
        })
      )
      .subscribe();
  }
}
