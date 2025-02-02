import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserData } from '../../types/user';

export const getUser = (state: Pick<State, NameSpace.User>): UserData | undefined => state[NameSpace.User].user;
export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
