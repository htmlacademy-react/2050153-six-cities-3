import { ReviewsProps } from '../types/review';
import { users } from './users';
import { getRandomInteger } from '../utils/utils';

export const reviews: ReviewsProps[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: users[getRandomInteger(0, users.length - 1)],
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 1
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62b',
    date: '2019-04-08T14:13:56.569Z',
    user: users[getRandomInteger(0, users.length - 1)],
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 2
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62c',
    date: '2019-03-08T14:13:56.569Z',
    user: users[getRandomInteger(0, users.length - 1)],
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 3
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62d',
    date: '2019-02-08T14:13:56.569Z',
    user: users[getRandomInteger(0, users.length - 1)],
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  }
];
