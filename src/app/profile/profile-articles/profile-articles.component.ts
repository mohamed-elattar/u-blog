import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleListConfig } from 'src/app/core/models/article-list-config.model';
import { Profile } from 'src/app/core/models/profile.model';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.css']
})
export class ProfileArticlesComponent implements OnInit {
  profile: Profile;
  articlesConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.parent.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile;
      this.articlesConfig = {
        type: 'all',
        filters: {}
      };
      this.articlesConfig.filters.author = this.profile.username;
    });
  }
}
