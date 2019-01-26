import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/sessions';

const defaultState = {}

const usersReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        [action.user.id]: action.user
      }
    case LOGOUT_CURRENT_USER: 
      return {}
    default:
      return state;
  }
}

export default usersReducer;