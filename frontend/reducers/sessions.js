import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/sessions';

const defaultState = {};

const sessionReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER: 
      return action.user
    case LOGOUT_CURRENT_USER: 
      return {};
    default:
      return state;
  }
}

export default sessionReducer;