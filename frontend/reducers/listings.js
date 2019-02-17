import { 
  RECEIVE_LISTING, 
  RECEIVE_LISTINGS, 
  REMOVE_LISTING
} from '../actions/listings';

import { RECEIVE_REVIEW } from '../actions/reviews'; 

import merge from 'lodash/merge';

export const listings = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LISTINGS:
      // return merge({}, 
      //   state, 
      //   action.bookings
      // )
      return !!action.listings ? action.listings : state
    
    case RECEIVE_LISTING:
      return merge({}, 
        state, 
        {
          [action.listing.id]: action.listing
        }
      )
    
    case RECEIVE_REVIEW:
      let newerState = merge({},state);
      let listing = newerState[action.review.listing_id];
      listing.review_ids.push(action.review.id)
      listing.rating = (action.review.rating + (listing.rating * (listing.review_ids.length - 1))) / listing.review_ids.length
      return newerState;
        
    case REMOVE_LISTING:
      let newState = merge({},state);
      delete newState[action.id]
      return newState
    default:
      return state;
  }
}

export default listings;