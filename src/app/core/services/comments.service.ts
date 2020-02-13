import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleComment } from '../models/article-comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private apiService: ApiService) {}
  add(slug, payload): Observable<ArticleComment> {
    return this.apiService
      .post(`/articles/${slug}/comments`, {
        comment: { body: payload }
      })
      .pipe(map(data => data.comment));
  }
  getAll(slug): Observable<ArticleComment[]> {
    return this.apiService
      .get(`/articles/${slug}/comments`)
      .pipe(map(data => data.comments));
  }
  destroy(commentId, articleSlug) {
    return this.apiService.delete(
      `/articles/${articleSlug}/comments/${commentId}`
    );
  }
}
