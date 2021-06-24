import { Expenses } from '../models/expenses.model';

export interface ExpensesState {
    expenses: Expenses[] | null;
    isLoading: boolean;
    error: any;
}

export const ExpensesInitialState: ExpensesState = {
    expenses: [],
    isLoading: true,
    error: null
};
