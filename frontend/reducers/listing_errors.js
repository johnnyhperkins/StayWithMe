import { RECEIVE_LISTING_ERRORS, RECEIVE_LISTING } from '../actions/listings';

export const listingErrors = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_LISTING_ERRORS:
      return action.errors || []
    // case RECEIVE_LISTING:
    //   return {}
    default:
      return state;
  }
}

export default listingErrors;