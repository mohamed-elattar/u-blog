import {
  Component,
  OnInit,
  Input,
  Output,
  OnDestroy,
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ArticleComment } from '../../core/models/article-comment.model';
@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @Input() comment: ArticleComment;
  @Output() deleteComment = new EventEmitter<boolean>();
  canModify: boolean;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = userData.username === this.comment.author.username;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  deleteClicked() {
    this.deleteComment.emit(true);
  }
}
