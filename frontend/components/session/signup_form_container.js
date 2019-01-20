import { connect } from 'react-redux';

import { signup, receiveSessionErrors } from '../../actions/sessions';
import { userExists } from '../../util/session_api';
import SessionForm from './session_form';

const msp = state => ({
    errors: state.errors.session,
    formType: "Sign Up",
    user: {username: '', email: '', password: ''},
    userExists
})

const mdp = (dispatch) => ({
  action: user => dispatch(signup(user)),
  receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors)),
  checkUsernameExists: (username) => dispatch(checkUsernameExists(username))
})

export default connect(msp,mdp)(SessionForm);