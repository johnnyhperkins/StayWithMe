import { connect } from 'react-redux';

import { 
  login, 
  signup, 
  receiveSessionErrors 
} from '../../actions/sessions';

import { toggleLoginModal, receiveMessages } from '../../actions/ui';


import SessionForm from './session_form';

const msp = (state, ownProps) => {
  let user, formType;

  if (ownProps.sessionModalType == 'login') {
    user = { username: '', password: '' };
    formType = "Log In"
  } else {
    user = { 
        username: '', 
        email: '', 
        password: '', 
        profile_thumb: 'default' 
      };
    formType = "Sign Up"
  }

  return {
    errors: state.errors.session,
    formType,
    user,
    messages: state.ui.messages.session
  }
}

const mdp = (dispatch, ownProps) => {
  let action;

  if (ownProps.sessionModalType == 'login') {
    action = login
  } else {
    action = signup
  }

  return {
    action: user => dispatch(action(user)),
    receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors)),
    toggleLoginModal: (modal,bool) => dispatch(toggleLoginModal(modal,bool)),
    receiveMessages: (messages, category) => dispatch(receiveMessages(messages, category))
  }
}

export default connect(msp,mdp)(SessionForm);