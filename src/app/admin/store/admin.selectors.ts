import { createSelector } from '@ngrx/store';
import { AppState } from '../../reducers/index';

export const getAdminState = (state: AppState) => state.admin;

export const getUsersList = createSelector(
  getAdminState,
  admin => admin.usersList
);

export const getUsersListLoading = createSelector(
  getAdminState,
  admin => admin.usersListLoading
);


export const getTemplesList = createSelector(
  getAdminState,
  admin => admin.temples
);

export const getTemplesListLoading = createSelector(
  getAdminState,
  admin => admin.templesListLoading
);
