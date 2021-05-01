import { DonationsReducer } from './donations.reducer';
import { DonationsInitialState } from './donations.state';

describe('donations Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = DonationsReducer(DonationsInitialState, action);

      expect(result).toBe(DonationsInitialState);
    });
  });
});
