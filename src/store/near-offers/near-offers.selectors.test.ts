import { random } from 'faker';
import { NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import { getRandomInteger } from '../../utils/utils';
import { getNearOffersLoadingStatus, getNearOffers } from './selectors';

describe('NearOffers selectors', () => {
  const allOffers = random.arrayElements([makeFakeOffer()], getRandomInteger(1, 50));
  const currentOffer = makeFakeOffer();
  const nearCurrentOfferOffers = allOffers.filter((offer) => offer.city.name === currentOffer.city.name);

  const state = {
    [NameSpace.NearOffers]: {
      nearOffers: nearCurrentOfferOffers,
      isNearOffersDataLoading: false,
    }
  };

  it('getNearOffers should return near offers from state', () => {
    const { nearOffers } = state[NameSpace.NearOffers];
    const result = getNearOffers(state);
    expect(result).toEqual(nearOffers);
  });

  it('getNearOffersLoadingStatus should return near offers data loading status', () => {
    const {isNearOffersDataLoading } = state[NameSpace.NearOffers];
    const result = getNearOffersLoadingStatus(state);
    expect(result).toBe(isNearOffersDataLoading);
  });
});
