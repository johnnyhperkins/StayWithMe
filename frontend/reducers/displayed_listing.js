import { RECEIVE_LISTING } from '../actions/listings';

export const displayed_listing = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LISTING:
      return { id: action.listing.id }
    default:
      return state;
  }
}

export default displayed_listing;