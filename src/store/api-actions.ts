import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { OfferProps, OffersProps } from '../types/offer';
import { UserData } from '../types/user';
import { UserAuthData } from '../types/user-auth';
import { redirectToRoute } from './action';
import { APIRoute, AppRoute } from '../const';
import { saveToken, dropToken } from '../services/token';
import { ReviewsFormProps, ReviewsProps } from '../types/review';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>();

export const fetchOffers = createAppAsyncThunk<OffersProps[], undefined>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OffersProps[]>(APIRoute.Offers);
    return data;
    // dispatch(chosenCity(INITIAL_CITY));
    // dispatch(chosenSortOption(INITIAL_SORT_TYPE));
  },
);

export const checkAuthAction = createAppAsyncThunk<void, undefined>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  }
);

export const fetchCurrentOffer = createAppAsyncThunk<OfferProps, string>(
  'data/fetchCurrentOffers',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferProps>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchNearOffers = createAppAsyncThunk<OffersProps[], string>(
  'data/fetchNearOffers',
  async (id, {extra: api}) => {
    const {data} = await api.get<OffersProps[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  },
);

export const fetchOfferReviews = createAppAsyncThunk<ReviewsProps[], string>(
  'comments/fetchOfferReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<ReviewsProps[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const postReviewAction = createAppAsyncThunk<ReviewsProps, ReviewsFormProps>(
  'comments/postReviewAction',
  async ({comment, rating, offerId}, {extra: api}) => {
    const {data} = await api.post<ReviewsProps>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    return data;
  },
);

export const loginAction = createAppAsyncThunk<UserData, UserAuthData>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  },
);

export const logoutAction = createAppAsyncThunk<void, undefined>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Main));
  },
);
