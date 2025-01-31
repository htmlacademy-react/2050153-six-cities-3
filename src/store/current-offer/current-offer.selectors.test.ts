import { NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import { getCurrentOffer, getOfferLoadingStatus } from './selectors';

describe('CurrentOffer selectors', () => {
  const offer = makeFakeOffer();

  const state = {
    [NameSpace.CurrentOffer]: {
      currentOffer: offer,
      isOfferDataLoading: true,
    }
  };

  it('getCurrentOffer should return offer from state', () => {
    const { currentOffer } = state[NameSpace.CurrentOffer];
    const result = getCurrentOffer(state);
    expect(result).toEqual(currentOffer);
  });

  it('getOfferLoadingStatus should return offer data loading status', () => {
    const { isOfferDataLoading } = state[NameSpace.CurrentOffer];
    const result = getOfferLoadingStatus(state);
    expect(result).toBe(isOfferDataLoading);
  });
});
