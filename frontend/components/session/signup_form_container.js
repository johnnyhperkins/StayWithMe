import { connect } from 'react-redux';
import { signup, receiveSessionErrors } from '../../actions/sessions';
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
      
  }
}

const mdp = (dispatch) => {
    dispatch(changeFormType('Sign Up')) // TO DO: need to change this
    return {
    action: user => dispatch(signup(user)),
    receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors)),
  }
}

export default connect(msp,mdp)(SessionForm);