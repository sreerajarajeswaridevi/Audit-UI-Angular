import { ExpensesReducer } from './expenses.reducer';
import { ExpensesInitialState } from './expenses.state';

describe('expenses Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = ExpensesReducer(ExpensesInitialState, action);

      expect(result).toBe(ExpensesInitialState);
    });
  });
});
