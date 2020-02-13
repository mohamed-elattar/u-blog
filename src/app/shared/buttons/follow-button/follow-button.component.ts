import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProfilesService } from '../../../core/services/profiles.service';
import { Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Profile } from 'src/app/core/models/profile.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent implements OnInit {
  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {}

  toggleFollowing() {
    this.isSubmitting = true;
    this.userService.isAuthenticated
      .pipe(
        concatMap(authenticated => {
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          }
          if (!this.profile.following) {
            return this.profilesService.follow(this.profile.username).pipe(
              tap(
                data => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                err => (this.isSubmitting = false)
              )
            );
          } else {
            return this.profilesService.unFollow(this.profile.username).pipe(
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
