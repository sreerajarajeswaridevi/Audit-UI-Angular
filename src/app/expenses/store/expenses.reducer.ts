import { ExpensesInitialState, ExpensesState } from './expenses.state';
import { ExpensesActions, ExpensesActionTypes } from './expenses.actions';

export function ExpensesReducer(state = ExpensesInitialState, action: ExpensesActions): ExpensesState {
  switch (action.type) {

    case ExpensesActionTypes.EXPENSES_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case ExpensesActionTypes.EXPENSES_ADD_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case ExpensesActionTypes.EXPENSES_LOADED: {
      return Object.assign({}, state, {
        expenses: action.payload.expenses,
        isLoading: false,
      });
    }

    case ExpensesActionTypes.EXPENSES_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
