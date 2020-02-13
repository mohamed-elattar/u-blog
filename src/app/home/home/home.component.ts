import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleListConfig } from 'src/app/core/models/article-list-config.model';
import { TagsService } from 'src/app/core/services/tags.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };
  tags: Array<string> = [];
  tagsLoaded = false;
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
      if (authenticated) {
        this.setListTo('feed');
      } else {
        this.setListTo('all');
      }
    });

    this.tagsService.getAll().subscribe(tags => {
      this.tags = tags;
      this.tagsLoaded = true;
    });
  }

  setListTo(type: string = '', filters: object = {}) {
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.listConfig = { type, filters };
  }
}
