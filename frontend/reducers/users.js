import { 
  RECEIVE_CURRENT_USER, 
  LOGOUT_CURRENT_USER, } from '../actions/sessions';
import { RECEIVE_USER } from '../actions/users';
import merge from 'lodash/merge';

const defaultState = {}

const usersReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_USER:
    case RECEIVE_CURRENT_USER:
      let user = action.user;
      return merge({}, 
        state, { [user.id]: user }
      )

    case LOGOUT_CURRENT_USER: 
      return {}
    default:
      return state;
  }
}

export default usersReducer;