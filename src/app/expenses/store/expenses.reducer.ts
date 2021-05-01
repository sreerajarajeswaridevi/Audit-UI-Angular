import { ExpensesInitialState, ExpensesState } from './expenses.state';
import { ExpensesActions, ExpensesActionTypes } from './expenses.actions';

export function ExpensesReducer(state = ExpensesInitialState, action: ExpensesActions): ExpensesState {
  switch (action.type) {

    case ExpensesActionTypes.POOJAS_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case ExpensesActionTypes.POOJAS_LOADED: {
      return Object.assign({}, state, {
        Expenses: action.payload.Expenses,
        isLoading: false,
      });
    }

    case ExpensesActionTypes.POOJAS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
