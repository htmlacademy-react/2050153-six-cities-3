import { UserProp } from './user';

type UserReviewProp = Pick<UserProp, 'name' | 'avatarUrl' | 'isPro'>;

export type ReviewsProps = {
  id: string;
  date: string;
  user: UserReviewProp;
  comment: string;
  rating: number;
}

export type ReviewsAddProps = Pick<ReviewsProps, 'comment' | 'rating'>;
