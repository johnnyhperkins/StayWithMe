import { RECEIVE_AMENITIES } from '../actions/listings';

export const amenities = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_AMENITIES:
      return action.amenities
    default:
      return state;
  }
}

export default amenities;