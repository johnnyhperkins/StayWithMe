import { connect } from 'react-redux';

import { login, receiveSessionErrors } from '../../actions/sessions';

import SessionForm from './session_form';


const msp = (state) => ({
  errors: state.errors.session,
  formType: "Log In",
  user: {username: '', password: ''},
  userExists: null,
})

const mdp = (dispatch) => ({
  action: user => dispatch(login(user)),
  receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors))
})

export default connect(msp,mdp)(SessionForm);