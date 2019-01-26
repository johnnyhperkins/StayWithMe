import { FORM_TYPE, RECEIVE_MESSAGES } from '../actions/ui';

const defaultState = {}

const uiReducer = (state = defaultState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case FORM_TYPE: 
      return {
        ...state,
        formType: action.formType
      }
      
    case RECEIVE_MESSAGES: 
      return {
        ...state, 
        messages: action.messages
      }

    default:
      return state;
  }
}

export default uiReducer;