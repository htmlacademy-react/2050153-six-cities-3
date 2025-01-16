import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { OfferProps, OffersProps } from '../types/offer';
import { UserData } from '../types/user';
import { UserAuthData } from '../types/user-auth';
import { loadOffers, setOffersDataLoadingStatus,
  redirectToRoute, loadUser, chosenCity,
  chosenSortOption, loadCurrentOffer, loadNearbyOffers,
  loadOfferReviews,
  loadNewReview} from './action';
import { APIRoute, AppRoute, INITIAL_CITY, INITIAL_SORT_TYPE } from '../const';
import { saveToken, dropToken } from '../services/token';
import { ReviewsFormProps, ReviewsProps } from '../types/review';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>();

export const fetchOffers = createAppAsyncThunk<void, undefined>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<OffersProps[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
    dispatch(chosenCity(INITIAL_CITY));
    dispatch(chosenSortOption(INITIAL_SORT_TYPE));
  },
);

export const checkAuthAction = createAppAsyncThunk<void, undefined>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  }
);

export const fetchCurrentOffer = createAppAsyncThunk<void, string>(
  'data/fetchCurrentOffers',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferProps>(`${APIRoute.Offers}/${id}`);
    dispatch(loadCurrentOffer(data));
  },
);

export const fetchNearOffers = createAppAsyncThunk<void, string>(
  'data/fetchNearOffers',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<OffersProps[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadNearbyOffers(data));
  },
);

export const fetchOfferReviews = createAppAsyncThunk<void, string>(
  'comments/fetchOfferReviews',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<ReviewsProps[]>(`${APIRoute.Comments}/${id}`);
    dispatch(loadOfferReviews(data));
  },
);

export const postReviewAction = createAppAsyncThunk<void, ReviewsFormProps>(
  'comments/postReviewAction',
  async ({comment, rating, offerId}, {dispatch, extra: api}) => {
    const {data} = await api.post<ReviewsProps>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    dispatch(loadNewReview(data));
  },
);

export const loginAction = createAppAsyncThunk<void, UserAuthData>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(loadUser(data));
    dispatch(redirectToRoute(AppRoute.Main));
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
