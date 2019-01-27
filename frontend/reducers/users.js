import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/sessions';

const defaultState = {}

const usersReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      let user = action.user;
      user.listing_ids = user.listing_ids.map(idObj => idObj.id);
      return {
        ...state,
        [user.id]: user
      }
    case LOGOUT_CURRENT_USER: 
      return {}
    default:
      return state;
  }
}

export default usersReducer;