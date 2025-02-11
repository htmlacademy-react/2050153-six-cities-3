import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeFavoriteOffer, makeFakeOffer, makeFakeOfferReview, makeFakeUser } from '../utils/mocks';
import { State } from '../types/state';
import { checkAuthAction, fetchOffers, fetchCurrentOffer, fetchNearOffers, fetchOfferReviews, postReviewAction, fetchFavoriteOffers, addFavoriteOffer, loginAction, logoutAction } from './api-actions';
import { APIRoute, AuthorizationStatus, INITIAL_CITY, INITIAL_SORT_TYPE } from '../const';
import { UserAuthData } from '../types/user-auth';
import * as tokenStorage from '../services/token';
import { chosenCity } from './offers/offers';
import { UserData } from '../types/user';
import { random } from 'faker';
import { getRandomInteger } from '../utils/utils';
import { ReviewsFormProps, ReviewsProps } from '../types/review';
import { FavoriteData } from '../types/favorite-data';
import { OffersProps } from '../types/offer';


describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      OFFERS: {
        offers: [],
        isOffersDataLoading: false,
        city: INITIAL_CITY,
        sortOption: INITIAL_SORT_TYPE,
        sortedOffers: [],
        offersByCity: [],
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: undefined,
      },
      OFFER: {
        currentOffer: undefined,
        isOfferDataLoading: false,
      },
      OFFER_REVIEWS: {
        offerReviews: [],
        isReviewsDataLoading: false,
      },
      NEAR_OFFERS: {
        nearOffers: [],
        isNearOffersDataLoading: false,
      },
      FAVORITES_DATA: {
        favoriteOffers: [],
        isFavoriteOffersDataLoading: false,
        isFavoriteOfferAdding: false,
      },
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffers', () => {
    it('should dispatch "fetchOffers.pending", "fetchOffers.fulfilled", when server response 200', async() => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffers.pending.type,
        fetchOffers.fulfilled.type,
        chosenCity.type,
      ]);
      expect(fetchOffersFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffers.pending", "fetchOffers.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffers());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.rejected.type,
      ]);
    });
  });

  describe('fetchCurrentOffer', () => {
    const mockOffer = makeFakeOffer();

    it('should dispatch "fetchCurrentOffer.pending", "fetchCurrentOffer.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}`).reply(200, mockOffer);

      await store.dispatch(fetchCurrentOffer(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCurrentOfferFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCurrentOffer.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCurrentOffer.pending.type,
        fetchCurrentOffer.fulfilled.type,
      ]);
      expect(fetchCurrentOfferFulfilled.payload)
        .toEqual(mockOffer);
    });

    it('should dispatch "fetchCurrentOffer.pending", "fetchCurrentOffer.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}`).reply(400, undefined);

      await store.dispatch(fetchCurrentOffer(mockOffer.id));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCurrentOffer.pending.type,
        fetchCurrentOffer.rejected.type,
      ]);
    });
  });

  describe('fetchNearOffers', () => {
    const allOffers = random.arrayElements([makeFakeOffer()], getRandomInteger(1, 50));
    const currentOffer = makeFakeOffer();
    const nearCurrentOfferOffers = allOffers.filter((offer) => offer.city.name === currentOffer.city.name);

    it('should dispatch "fetchNearOffers.pending", "fetchNearOffers.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${currentOffer.id}/nearby`).reply(200, nearCurrentOfferOffers);

      await store.dispatch(fetchNearOffers(currentOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearOffersFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearOffers.pending.type,
        fetchNearOffers.fulfilled.type,
      ]);
      expect(fetchNearOffersFulfilled.payload)
        .toEqual(nearCurrentOfferOffers);
    });

    it('should dispatch "fetchNearOffers.pending", "fetchNearOffers.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${currentOffer.id}/nearby`).reply(400, []);

      await store.dispatch(fetchNearOffers(currentOffer.id));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearOffers.pending.type,
        fetchNearOffers.rejected.type,
      ]);
    });
  });

  describe('fetchOfferReviews', () => {
    const mockOffer = makeFakeOffer();
    const currentOfferReviews = random.arrayElements([makeFakeOfferReview()], getRandomInteger(0, 10));

    it('should dispatch "fetchOfferReviews.pending", "fetchOfferReviews.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOffer.id}`).reply(200, currentOfferReviews);

      await store.dispatch(fetchOfferReviews(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferReviewsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferReviews.pending.type,
        fetchOfferReviews.fulfilled.type,
      ]);
      expect(fetchOfferReviewsFulfilled.payload)
        .toEqual(currentOfferReviews);
    });

    it('should dispatch "fetchOfferReviews.pending", "fetchOfferReviews.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOffer.id}`).reply(400, []);

      await store.dispatch(fetchOfferReviews(mockOffer.id));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferReviews.pending.type,
        fetchOfferReviews.rejected.type,
      ]);
    });
  });

  describe('postReviewAction', () => {
    const mockOffer = makeFakeOffer();
    const postedOffeReview: ReviewsProps = makeFakeOfferReview();
    const fakeFormReview: ReviewsFormProps = { comment: postedOffeReview.comment, rating: postedOffeReview.rating, offerId: mockOffer.id };

    it('should dispatch "postReviewAction.pending", "postReviewAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${fakeFormReview.offerId}`).reply(200, postedOffeReview);

      await store.dispatch(postReviewAction(fakeFormReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof postReviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type,
      ]);
      expect(postReviewActionFulfilled.payload)
        .toEqual(postedOffeReview);
    });

    it('should dispatch "postReviewAction.pending", "postReviewAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${fakeFormReview.offerId}`).reply(400, undefined);

      await store.dispatch(postReviewAction(fakeFormReview));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoriteOffers', () => {
    const userFavoriteOffers = random.arrayElements([makeFakeFavoriteOffer()], getRandomInteger(1, 20));

    it('should dispatch "fetchFavoriteOffers.pending", "fetchFavoriteOffers.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(200, userFavoriteOffers);

      await store.dispatch(fetchFavoriteOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteOffersFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.fulfilled.type,
      ]);
      expect(fetchFavoriteOffersFulfilled.payload)
        .toEqual(userFavoriteOffers);
    });

    it('should dispatch "fetchFavoriteOffers.pending", "fetchFavoriteOffers.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorites).reply(400, []);

      await store.dispatch(fetchFavoriteOffers());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.rejected.type,
      ]);
    });
  });

  describe('addFavoriteOffer', () => {
    const userFavoriteOffer: OffersProps = makeFakeOffer();
    const fakeFavoriteData: FavoriteData = { id: userFavoriteOffer.id, isFavorite: userFavoriteOffer.isFavorite };
    const statusNumber = Number(fakeFavoriteData.isFavorite);

    it('should dispatch "addFavoriteOffer.pending", "addFavoriteOffer.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${fakeFavoriteData.id}/${statusNumber}`).reply(200, userFavoriteOffer);

      await store.dispatch(addFavoriteOffer(fakeFavoriteData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const addFavoriteOfferFulfilled = emittedActions.at(1) as ReturnType<typeof addFavoriteOffer.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        addFavoriteOffer.pending.type,
        addFavoriteOffer.fulfilled.type,
      ]);
      expect(addFavoriteOfferFulfilled.payload)
        .toEqual(userFavoriteOffer);
    });

    it('should dispatch "postReviewAction.pending", "postReviewAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorites}/${fakeFavoriteData.id}/${statusNumber}`).reply(400, undefined);

      await store.dispatch(addFavoriteOffer(fakeFavoriteData));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addFavoriteOffer.pending.type,
        addFavoriteOffer.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    const fakeUser: UserAuthData = { login: 'test@test.ru', password: '12345k' };
    const fakeServerReplay = { token: 'secret' };

    it('should dispatch "loginAction.pending", "loginAction.fulfilled" when server response 200', async() => {
      const fakeUserData: UserData = makeFakeUser();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const loginActionFulfilled = emittedActions.at(1) as ReturnType<typeof loginAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
      expect(loginActionFulfilled.payload)
        .toEqual(fakeUserData);
    });

    it('should call "saveToken" once with the received token', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
