import { UserProps } from './user';

export type UserReviewProps = Pick<UserProps, 'name' | 'avatarUrl' | 'isPro'>;

export type ReviewsProps = {
  id: string;
  date: string;
  user: UserReviewProps;
  comment: string;
  rating: number;
}

export type ReviewsFormProps = Pick<ReviewsProps, 'comment' | 'rating'>;
