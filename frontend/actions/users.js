import * as ApiUsersUtil from '../util/users_api';
import { receiveCurrentUser, receiveSessionErrors } from './sessions';
import { receiveMessages } from '../actions/ui';

export const RECEIVE_USER = "RECEIVE_USER";

export const updateUser = (user) => dispatch => {
  return ApiUsersUtil.update(user).then(res => {
    dispatch(receiveMessages(["Profile has been successfully updated"], 'profile'));
    return dispatch(receiveCurrentUser(res));
  },
  (e) => {
    return dispatch(receiveSessionErrors(e.responseJSON));
  })
}

export const fetchUser = (id) => dispatch => {
  return ApiUsersUtil.fetchUser(id).then(user => {
    return dispatch(receiveUser(user));
  }, (e) => {
    return dispatch(receiveSessionErrors(e.responseJSON));
  })
}

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
})