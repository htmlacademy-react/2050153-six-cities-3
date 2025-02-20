import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { OfferProps, OffersProps } from '../types/offer';
import { UserData } from '../types/user';
import { UserAuthData } from '../types/user-auth';
import { redirectToRoute } from './action';
import { APIRoute, AppRoute, INITIAL_CITY } from '../const';
import { saveToken, dropToken } from '../services/token';
import { ReviewsFormProps, ReviewsProps } from '../types/review';
import { chosenCity, updateOffersFavorite } from './offers/offers';
import { FavoriteData } from '../types/favorite-data';
import { updateCurrentOfferFavoriteStatus } from './current-offer/current-offer';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>();

export const fetchOffers = createAppAsyncThunk<OffersProps[], undefined>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OffersProps[]>(APIRoute.Offers);
    dispatch(chosenCity({city: INITIAL_CITY, allOffers: data}));
    return data;
  },
);

export const fetchFavoriteOffers = createAppAsyncThunk<OffersProps[], undefined>(
  'favorites/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OffersProps[]>(APIRoute.Favorites);
    return data;
  },
);

export const addFavoriteOffer = createAppAsyncThunk<OffersProps, FavoriteData>(
  'favorites/addFavoriteOffer',
  async ({id, isFavorite}, {dispatch, extra: api}) => {
    const statusNumber = Number(isFavorite);
    const {data} = await api.post<OffersProps>(`${APIRoute.Favorites}/${id}/${statusNumber}`, {statusNumber});
    dispatch(updateCurrentOfferFavoriteStatus({offerId: id, favoriteStatus: isFavorite}));
    dispatch(updateOffersFavorite({offerId: id, favoriteStatus: isFavorite}));
    return data;
  },
);

export const loginAction = createAppAsyncThunk<UserData, UserAuthData>(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
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

export const checkAuthAction = createAppAsyncThunk<UserData, undefined>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoriteOffers());
    return data;
  }
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

export const fetchCurrentOffer = createAppAsyncThunk<OfferProps, string>(
  'data/fetchCurrentOffers',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferProps>(`${APIRoute.Offers}/${id}`);
    dispatch(fetchNearOffers(id));
    dispatch(fetchOfferReviews(id));
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
