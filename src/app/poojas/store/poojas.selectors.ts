import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PoojasState } from './poojas.state';

export const getPoojasState = createFeatureSelector<PoojasState>('poojas');

export const getPoojas = createSelector(
  getPoojasState,
  poojas => poojas.poojas
);

export const getIsLoading = createSelector(
  getPoojasState,
  poojas => poojas.isLoading
);

export const getError = createSelector(
  getPoojasState,
  poojas => poojas.error
);
