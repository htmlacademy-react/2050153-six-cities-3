import { UserProps } from '../types/user';
import { UserReviewProps } from '../types/review';

export const users: UserReviewProps[] | UserProps[] = [
  {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false,
    email: 'Oliver.conner@gmail.com',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  },
  {
    name: 'Angelina Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: true,
    email: 'Angelina.conner@gmail.com',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  },
];
