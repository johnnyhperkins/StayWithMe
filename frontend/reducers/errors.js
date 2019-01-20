import { combineReducers } from 'redux';
import sessionErrors from './session_errors';

const errorsReducer = combineReducers({
  session: sessionErrors
})

export default errorsReducer;