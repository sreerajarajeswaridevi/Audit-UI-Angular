import { PoojasInitialState, PoojasState } from './poojas.state';
import { PoojasActions, PoojasActionTypes } from './poojas.actions';

export function PoojasReducer(state = PoojasInitialState, action: PoojasActions): PoojasState {
  switch (action.type) {

    case PoojasActionTypes.POOJAS_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case PoojasActionTypes.POOJAS_LOADED: {
      return Object.assign({}, state, {
        poojas: action.payload.poojas,
        isLoading: false,
      });
    }

    case PoojasActionTypes.POOJAS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    default:
      return state;
  }
}
