import { FORM_TYPE, RECEIVE_MESSAGES, START_LOADING_LISTING } from '../actions/ui';
import { RECEIVE_LISTING, RECEIVE_LISTINGS } from '../actions/listings';

const defaultState = {
  listingLoading: true
}

const uiReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case FORM_TYPE: 
      return {
        ...state,
        formType: action.formType
      }
    
    case START_LOADING_LISTING:
      return {
        ...state,
        listingLoading: true
      }
    case RECEIVE_LISTINGS:
    case RECEIVE_LISTING:
      return {
        ...state,
        listingLoading: false
    }
    case RECEIVE_MESSAGES: 
      return {
        ...state, 
        messages: action.messages
      }

    default:
      return state;
  }
}

export default uiReducer;