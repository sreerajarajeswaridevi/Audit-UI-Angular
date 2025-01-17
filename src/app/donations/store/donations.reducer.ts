import { DonationsInitialState, DonationsState } from './donations.state';
import { DonationsActions, DonationsActionTypes } from './donations.actions';

export function DonationsReducer(state = DonationsInitialState, action: DonationsActions): DonationsState {
  switch (action.type) {

    case DonationsActionTypes.DONATIONS_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }
    case DonationsActionTypes.DONATIONS_ADD_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case DonationsActionTypes.DONATIONS_LOADED: {
      return Object.assign({}, state, {
        donations: action.payload.donations,
        isLoading: false,
      });
    }

    case DonationsActionTypes.DONATIONS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
