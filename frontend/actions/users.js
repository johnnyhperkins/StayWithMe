import {receiveCurrentUser, receiveSessionErrors } from './sessions';
import { update } from '../util/users_api';
import { receiveMessages } from '../actions/ui';

export const updateUser = (user) => dispatch => {
  return update(user).then((res) => {
    // debugger
    dispatch(receiveMessages(res));
    return dispatch(receiveCurrentUser(user));
  },
  (e) => {
    return dispatch(receiveSessionErrors(e.responseJSON));
  })
}
