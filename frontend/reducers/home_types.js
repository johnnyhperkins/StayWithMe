import { RECEIVE_AMENITIES_AND_HOME_TYPES } from '../actions/listings';

export const home_types = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_AMENITIES_AND_HOME_TYPES:
      return action.home_types
    default:
      return state;
  }
}

export default home_types;