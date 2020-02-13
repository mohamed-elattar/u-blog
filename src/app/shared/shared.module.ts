import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { FollowButtonComponent } from './buttons/follow-button/follow-button.component';
import { FavoriteButtonComponent } from './buttons/favorite-button/favorite-button.component';
import { ArticleListComponent } from './article-helpers/article-list/article-list.component';
import { ArticleMetaComponent } from './article-helpers/article-meta/article-meta.component';
import { ArticlePreviewComponent } from './article-helpers/article-preview/article-preview.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ListErrorsComponent,
    ShowAuthedDirective,
    FollowButtonComponent,
    FavoriteButtonComponent,
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ListErrorsComponent,
    ShowAuthedDirective,
    FollowButtonComponent,
    FavoriteButtonComponent,
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent
  ]
})
export class SharedModule {}
