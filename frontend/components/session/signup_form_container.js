import { connect } from 'react-redux';

import { signup, receiveSessionErrors } from '../../actions/sessions';
import { userExists } from '../../util/session_api';
import SessionForm from './session_form';
import { changeFormType } from '../../actions/ui';

const msp = state => {
  
  return {
      errors: state.errors.session,
      formType: state.ui.formType || "Sign Up",
      user: { 
        username: '', 
        email: '', 
        password: '', 
        profile_thumb: 'default' 
      },
      userExists
  }
}

const mdp = (dispatch) => {
    dispatch(changeFormType('Sign Up'))
    return {
    action: user => dispatch(signup(user)),
    receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors)),
    checkUsernameExists: (username) => dispatch(checkUsernameExists(username))  
  }
}

export default connect(msp,mdp)(SessionForm);