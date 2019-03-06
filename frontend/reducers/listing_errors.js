import { RECEIVE_LISTING_ERRORS } from '../actions/listings';

export const listingErrors = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_LISTING_ERRORS:
      return action.errors || []
    default:
      return state;
  }
}

export default listingErrors;