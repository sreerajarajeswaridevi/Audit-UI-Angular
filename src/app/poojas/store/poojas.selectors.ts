import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PoojasState } from './poojas.state';

export const getPoojasState = createFeatureSelector<PoojasState>('poojas');

export const getPoojaTypes = createSelector(
  getPoojasState,
  poojas => poojas.poojaTypes
);

export const getNewlyRegisteredPooja = createSelector(
  getPoojasState,
  poojas => poojas.newPoojasRegistered
);


export const getPoojaList = createSelector(
  getPoojasState,
  poojas => poojas.poojaList
);

export const getIsLoading = createSelector(
  getPoojasState,
  poojas => poojas.isLoading
);

export const getIsListLoading = createSelector(
  getPoojasState,
  poojas => poojas.isListLoading
);

export const getError = createSelector(
  getPoojasState,
  poojas => poojas.error
);
