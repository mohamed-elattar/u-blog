import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../core/models/article.model';
import { ArticlesService } from '../core/services/articles.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  article: Article = {} as Article;
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: object = {};
  isSubmitting = false;
  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: ''
    });
    this.article.tagList = [];
  }
  ngOnInit() {
    this.route.data.subscribe((data: { article: Article }) => {
      if (data.article) {
        this.article = data.article;
        this.articleForm.patchValue(data.article);
      }
    });
  }
  addTag() {
    const tag = this.tagField.value;

    if (this.article.tagList.indexOf(tag) < 0 && tag) {
      this.article.tagList.push(tag);
    }
    this.tagField.reset('');
  }
  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }
  submitForm() {
    this.isSubmitting = true;
    this.updateArticle(this.articleForm.value);
    this.articlesService.save(this.article).subscribe(
      article => this.router.navigateByUrl('/article/' + article.slug),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
  updateArticle(values: object) {
    Object.assign(this.article, values);
  }
}
