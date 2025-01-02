import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { OffersProps } from '../types/offer';
import { UserData } from '../types/user';
import { UserAuthData } from '../types/user-auth';
import { loadOffers, requireAuthorization, setOffersDataLoadingStatus, redirectToRoute } from './action';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { saveToken, dropToken } from '../services/token';

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
  },
);

export const checkAuthAction = createAppAsyncThunk<void, undefined>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAppAsyncThunk<void, UserAuthData>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAppAsyncThunk<void, undefined>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);
