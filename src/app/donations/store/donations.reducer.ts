import { DonationsInitialState, DonationsState } from './donations.state';
import { DonationsActions, DonationsActionTypes } from './donations.actions';

export function DonationsReducer(state = DonationsInitialState, action: DonationsActions): DonationsState {
  switch (action.type) {

    case DonationsActionTypes.POOJAS_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case DonationsActionTypes.POOJAS_LOADED: {
      return Object.assign({}, state, {
        Donations: action.payload.Donations,
        isLoading: false,
      });
    }

    case DonationsActionTypes.POOJAS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
