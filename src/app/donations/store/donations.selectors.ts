import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DonationsState } from './donations.state';

export const getDonationsState = createFeatureSelector<DonationsState>('donations');

export const getDonations = createSelector(
  getDonationsState,
  donations => donations.donations
);

export const getIsLoading = createSelector(
  getDonationsState,
  donations => donations.isLoading
);

export const getError = createSelector(
  getDonationsState,
  donations => donations.error
);
