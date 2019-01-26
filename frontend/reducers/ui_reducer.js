import { FORM_TYPE, RECEIVE_MESSAGES } from '../actions/ui';

import { merge } from 'lodash';

const defaultState = {}

const uiReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case FORM_TYPE: 
      return merge({}, state, {formType: action.formType})
    case RECEIVE_MESSAGES: 
      return merge({}, state, {messages: action.messages})
    default:
      return state;
  }
}

export default uiReducer;