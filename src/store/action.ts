import { createAction } from '@reduxjs/toolkit';
import { AppRoute, REDIRECT_ACTION_TYPE } from '../const';

export const redirectToRoute = createAction<AppRoute | string > (REDIRECT_ACTION_TYPE);
