import { createAction } from '@reduxjs/toolkit';
import { CityProps } from '../types/offer';

export const chosenCity = createAction<CityProps['name']>('offers/chosenCity');
export const resetCity = createAction('offers/reset');
