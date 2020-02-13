import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ArticleListConfig } from '../models/article-list-config.model';
import { Observable, config } from 'rxjs';
import { Article } from '../models/article.model';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private apiService: ApiService) {}
  query(
    articleConfig: ArticleListConfig
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    const params = {};
    Object.keys(articleConfig.filters).forEach(key => {
      params[key] = articleConfig.filters[key];
    });
    return this.apiService.get(
      '/articles' + (articleConfig.type === 'feed' ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }
  get(slug): Observable<Article> {
    return this.apiService
      .get('/articles/' + slug)
      .pipe(map(data => data.article));
  }
  destroy(slug) {
    return this.apiService.delete('/articles/' + slug);
  }
  save(article): Observable<Article> {
    if (article.slug) {
      return this.apiService
        .put('/articles/' + article.slug, {
          article
        })
        .pipe(map(data => data.article));
    } else {
      return this.apiService
        .post('/articles/', { article })
        .pipe(map(data => data.article));
    }
  }
  favorite(slug): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }
  unFavorite(slug): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }
}
