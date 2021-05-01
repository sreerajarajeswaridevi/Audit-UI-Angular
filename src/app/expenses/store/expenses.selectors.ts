import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ExpensesState } from './expenses.state';

export const getExpensesState = createFeatureSelector<ExpensesState>('expenses');

export const getExpenses = createSelector(
  getExpensesState,
  expenses => expenses.expenses
);

export const getIsLoading = createSelector(
  getExpensesState,
  expenses => expenses.isLoading
);

export const getError = createSelector(
  getExpensesState,
  expenses => expenses.error
);
