import { connect } from 'react-redux';

import { signup, receiveSessionErrors } from '../../actions/sessions';
import SessionForm from './session_form';

const msp = state => ({
    errors: state.errors.session,
    formType: "Sign Up",
    user: {username: '', email: '', password: ''}
})

const mdp = (dispatch) => ({
  action: user => dispatch(signup(user)),
  receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors))
})

export default connect(msp,mdp)(SessionForm);