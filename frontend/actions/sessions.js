export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

import * as ApiUtil from '../util/session_api';

export const login = (user) => dispatch => {
  return ApiUtil.login(user).then(user => {
    return dispatch(receiveCurrentUser(user));
  },
  (e) => {
    return dispatch(receiveSessionErrors(e.responseJSON));
  })
}

export const logout = () => dispatch => {
  return ApiUtil.logout().then(() => {
    return dispatch(logoutCurrentUser());
  },
  (e) => {
    return dispatch(receiveSessionErrors(e.responseJSON));
  })
}

export const signup = (user) => dispatch => {
  return ApiUtil.signup(user).then(user => {
    return dispatch(receiveCurrentUser(user));
  },
  (e) => {
    return dispatch(receiveSessionErrors(e.responseJSON));
  })
}

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
})
const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
})

export const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})