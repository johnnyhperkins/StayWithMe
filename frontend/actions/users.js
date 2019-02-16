import { receiveCurrentUser, receiveSessionErrors } from './sessions';
import { update } from '../util/users_api';
import { receiveMessages } from '../actions/ui';

export const updateUser = (user) => dispatch => {
  return update(user).then((res) => {

    dispatch(receiveMessages(["Profile has been successfully updated"]));
    return dispatch(receiveCurrentUser(res));
  },
  (e) => {
    return dispatch(receiveSessionErrors(e.responseJSON));
  })
}
