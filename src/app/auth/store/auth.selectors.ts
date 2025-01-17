import { createSelector } from '@ngrx/store';
import { AppState } from '../../reducers';

export const getAuthState = (state: AppState) => state.auth;

export const getUser = createSelector(
  getAuthState,
  auth => auth.user
);

export const getIsLoggedIn = createSelector(
  getAuthState,
  auth => auth.isLoggedIn
);

export const getIsLoading = createSelector(
  getAuthState,
  auth => auth.isLoading
);

export const getIsAdmin = createSelector(
  getAuthState,
  auth => auth.isAdmin
);

export const getError = createSelector(
  getAuthState,
  auth => auth.error
);

export const isManager = createSelector(
  getAuthState,
  (auth: any) => {
    if (auth && auth.user && auth.user.role) {
      return auth.user.role === 'manager'
    }
    return false;
  }
);

export const isAdmin = createSelector(
  getAuthState,
  (auth: any) => {
    if (auth && auth.user && auth.user.role) {
      return auth.user.role === 'admin'
    }
    return false;
  }
);

export const isUser = createSelector(
  getAuthState,
  (auth: any) => {
    if (auth && auth.user && auth.user.role) {
      return auth.user.role === 'user'
    }
    return false;
  }
);
