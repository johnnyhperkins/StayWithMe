import { FORM_TYPE } from '../actions/ui';
import { merge } from 'lodash';

const defaultState = {}

const uiReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case FORM_TYPE: 
      return merge({}, state, {formType: action.formType})
    default:
      return state;
  }
}

export default uiReducer;