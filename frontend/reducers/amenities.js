import { RECEIVE_AMENITIES_AND_HOME_TYPES } from '../actions/listings';

export const amenities = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_AMENITIES_AND_HOME_TYPES:
      return action.amenities
    default:
      return state;
  }
}

export default amenities;