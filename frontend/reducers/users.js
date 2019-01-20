import { RECEIVE_CURRENT_USER } from '../actions/sessions';
import { merge } from 'lodash';

const defaultState = {}

const usersReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER: 
      return merge({}, state, {[action.user.id]: action.user})
    default:
      return state;
  }
}

export default usersReducer;