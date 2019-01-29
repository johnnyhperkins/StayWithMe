import { FORM_TYPE, RECEIVE_MESSAGES, START_LOADING_LISTING } from '../actions/ui';
import { RECEIVE_LISTING, RECEIVE_LISTINGS } from '../actions/listings';
import merge from 'lodash/merge';

const defaultState = {
  listingLoading: true,
  messages: []
}

const uiReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case FORM_TYPE: 
    return merge({}, 
      state, { formType: action.formType }
    )
    
    case START_LOADING_LISTING:
    return merge({}, 
      state, { listingLoading: true }
    ) 
      
    case RECEIVE_LISTINGS:
    case RECEIVE_LISTING:
      return merge({}, 
        state, { listingLoading: false }
      ) 
      
    case RECEIVE_MESSAGES: 
      return merge({}, 
        state, { messages: action.messages }
      ) 
    default:
      return state;
  }
}

export default uiReducer;