import { Component, OnInit, Input } from '@angular/core';
import { ArticleListConfig } from 'src/app/core/models/article-list-config.model';
import { Article } from 'src/app/core/models/article.model';
import { ArticlesService } from 'src/app/core/services/articles.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  constructor(private articlesService: ArticlesService) {}
  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }
  query: ArticleListConfig;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];
  ngOnInit() {}

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }
  runQuery() {
    this.loading = true;
    this.results = [];
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }
    this.articlesService.query(this.query).subscribe(data => {
      this.loading = false;
      this.results = data.articles;
      this.totalPages = Array.from(
        new Array(Math.ceil(data.articlesCount / this.limit)),
        (val, index) => index + 1
      );
    });
  }
}
