import { 
  RECEIVE_LISTING, 
  RECEIVE_LISTINGS, 
  REMOVE_LISTING 
} from '../actions/listings';

import merge from 'lodash/merge';


export const listings = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return !!action.listings ? action.listings : {}
    case RECEIVE_LISTING:
      return merge({}, 
        state, 
        {
          [action.listing.id]: action.listing
        }
      )
    case REMOVE_LISTING:
      let newState = merge({},state);
      delete newState[action.id]
      return newState
    default:
      return state;
  }
}

export default listings;