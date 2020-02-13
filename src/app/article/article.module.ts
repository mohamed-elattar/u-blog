import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { MarkdownPipe } from './markdown.pipe';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { ArticleComponent } from './article.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MarkdownPipe, ArticleCommentComponent, ArticleComponent],
  imports: [SharedModule, ArticleRoutingModule]
})
export class ArticleModule {}
