import { ProfileComponent } from './profile.component';
import { ProfileResolverService } from './profile-resolver.service';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: { profile: ProfileResolverService },
    children: [
      { path: '', component: ProfileArticlesComponent },
      { path: 'favorites', component: ProfileFavoritesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
