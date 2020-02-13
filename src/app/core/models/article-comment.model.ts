import { Profile } from './profile.model';

export interface ArticleComment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}
