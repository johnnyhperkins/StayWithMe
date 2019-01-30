import { 
  FORM_TYPE, 
  RECEIVE_MESSAGES, 
  RECEIVE_SEARCH_QUERY,
  UPDATE_BOUNDS, 
  START_LOADING_LISTING 
} from '../actions/ui';

import { RECEIVE_LISTING, RECEIVE_LISTINGS } from '../actions/listings';
import merge from 'lodash/merge';

const defaultState = {
  listingLoading: true,
  searching: true,
  messages: []
}

const uiReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case FORM_TYPE: 
    return merge({}, 
      state, { 
        formType: action.formType 
      })
    
    case START_LOADING_LISTING:
    return merge({}, 
      state, { 
        listingLoading: true 
      }) 
      
    case RECEIVE_LISTINGS:
    case RECEIVE_LISTING:
      return merge({}, 
        state, { 
          listingLoading: false,
          searching: false 
        }) 

    case UPDATE_BOUNDS:
      return merge({}, 
        state, { 
          bounds: action.bounds,
          // searching: true ?
        })

    case RECEIVE_SEARCH_QUERY:
      return merge({}, state, {
        searching: !action.query,
        query: action.query,
        listingLoading: true
      })

    case RECEIVE_MESSAGES: 
      return merge({}, 
        state, { 
          messages: action.messages 
        })

    default:
      return state;
  }
}

export default uiReducer;