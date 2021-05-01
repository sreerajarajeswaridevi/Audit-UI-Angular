import { PoojasReducer } from './poojas.reducer';
import { PoojasInitialState } from './poojas.state';

describe('poojas Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = PoojasReducer(PoojasInitialState, action);

      expect(result).toBe(PoojasInitialState);
    });
  });
});
