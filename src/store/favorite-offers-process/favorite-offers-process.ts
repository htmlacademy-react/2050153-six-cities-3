// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { NameSpace } from '../../const';
// import { OffersProps } from '../../types/offer';
// import { getCurrentSortedOffers } from '../../utils/page-utils';
// import { FavoriteOffersProcess } from '../../types/state';

// const initialState: FavoriteOffersProcess = {

// };

// export const favoriteOffersProcess = createSlice({
//   name: NameSpace.Favorites,
//   initialState,
//   reducers: {
//     chosenFavoriteOffer: (state, action: PayloadAction<{city: string; offers: OffersProps[]}>) => {
//       const {city, offers} = action.payload;

//       state.city = city;
//       state.offersByCity = offers.filter((offer) => offer.city.name === city);
//       state.sortedOffers = getCurrentSortedOffers(state.offersByCity, state.sortOption);
//     },
//     unselectedFavoriteOffer: (state, action: PayloadAction<{sortOption: string}>) => {
//       const {sortOption} = action.payload;

//       if (state.sortOption !== sortOption) {
//         state.sortOption = sortOption;
//         state.sortedOffers = getCurrentSortedOffers(state.offersByCity, sortOption);
//       }
//     },
//   },
// });

// export const {chosenCity, chosenSortOption} = offersProcess.actions;
