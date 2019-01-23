import { connect } from 'react-redux';

import { login, receiveSessionErrors } from '../../actions/sessions';
import { changeFormType } from '../../actions/ui';

import SessionForm from './session_form';

const msp = (state) => {
  
  return {
  errors: state.errors.session,
  formType: state.ui.formType || "Log In",
  user: { username: '', password: '' },
  userExists: () => null,
}}

const mdp = (dispatch) => {
  dispatch(changeFormType('Log In'));
  return {
    action: user => dispatch(login(user)),
    receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors)),
  }
}

export default connect(msp,mdp)(SessionForm);