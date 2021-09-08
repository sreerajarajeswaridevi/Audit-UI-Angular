import { PoojasInitialState, PoojasState } from './poojas.state';
import { PoojasActions, PoojasActionTypes } from './poojas.actions';

export function PoojasReducer(state = PoojasInitialState, action: PoojasActions): PoojasState {
  switch (action.type) {

    case PoojasActionTypes.POOJA_TYPE_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    
    case PoojasActionTypes.POOJA_TYPE_LOADED: {
      return Object.assign({}, state, {
        poojaTypes: action.payload.poojas,
        isLoading: false,
      });
    }
    
    case PoojasActionTypes.POOJA_TYPE_ADD_QUERY: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }
    case PoojasActionTypes.POOJA_ADD_QUERY: {
      return Object.assign({}, state, {
        isListLoading: true,
      });
    }
    
    case PoojasActionTypes.POOJAS_ERROR: {
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload.error
      });
    }

    case PoojasActionTypes.POOJA_LIST_QUERY: {
      return Object.assign({}, state, {
        isListLoading: true,
      });
    }
    
    case PoojasActionTypes.POOJA_LIST_LOADED: {
      return Object.assign({}, state, {
        isListLoading: false,
        poojaList: action.payload.poojaList,
      });
    }

    case PoojasActionTypes.POOJA_REGISTERED: {
      return Object.assign({}, state, {
        isListLoading: false,
        newPoojasRegistered: action.payload.response,
      });
    }


    default:
      return state;
  }
}
