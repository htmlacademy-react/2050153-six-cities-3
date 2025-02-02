import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';
import { makeFakeUser } from '../../utils/mocks';
import { getAuthCheckedStatus, getAuthorizationStatus, getUser } from './selectors';

describe('UserProcess selectors', () => {
  it('should return authorization status from state', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state: UserProcess = { authorizationStatus };
    const result = getAuthorizationStatus({ [NameSpace.User]: state });
    expect(result).toBe(authorizationStatus);
  });

  it('should return "true" because auth status is "Auth"', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state: UserProcess = { authorizationStatus };
    const result = getAuthCheckedStatus({ [NameSpace.User]: state });
    expect(result).toBe(true);
  });

  it('should return "false" because auth status is "Unknown"', () => {
    const authorizationStatus = AuthorizationStatus.Unknown;
    const state: UserProcess = { authorizationStatus };
    const result = getAuthCheckedStatus({ [NameSpace.User]: state });
    expect(result).toBe(false);
  });

  it('should return userData from state', () => {
    const user = makeFakeUser();
    const state: UserProcess = {
      user,
      authorizationStatus: AuthorizationStatus.Auth
    };
    const result = getUser({ [NameSpace.User]: state });
    expect(result).toBe(user);
  });

  it('should return undefined from state', () => {
    const user = undefined;
    const state: UserProcess = {
      user,
      authorizationStatus: AuthorizationStatus.Auth
    };
    const result = getUser({ [NameSpace.User]: state });
    expect(result).toBe(user);
  });
});
