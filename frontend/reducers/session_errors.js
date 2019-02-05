import { 
  RECEIVE_SESSION_ERRORS, 
  RECEIVE_CURRENT_USER } from '../actions/sessions';
import { TOGGLE_LOGIN_MODAL } from '../actions/ui';


export const sessionErrors = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors 
      // return action.errors || {}
    case TOGGLE_LOGIN_MODAL:
    case RECEIVE_CURRENT_USER:
      return {}
    default:
      return state;
  }
}

export default sessionErrors;