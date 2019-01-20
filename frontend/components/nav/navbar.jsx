import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import ReactModal from 'react-modal';
import SignUpForm from '../session/signup_form'
import LoginForm from '../session/login_form'

import { logout } from '../../actions/sessions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpOpen: false,
      loginOpen: false
    }
  }

  handleToggleModal = () => {
    this.setState({loginOpen: !this.state.loginOpen})
  }

  render() {
    const { session, logout } = this.props;
    return (
      <>
      <nav>
        { isEmpty(session) ? 
        <>
          <NavLink to='/signup'>Sign Up</NavLink>
          <span onClick={this.handleToggleModal} >Log In</span>
        </>
        : 
        (
          <>
          <p>Welcome {session.username}</p>
          <span onClick={logout}>Log Out</span>
          </>
        )
        }
      </nav>
      <ReactModal 
        isOpen={this.state.loginOpen}
        onRequestClose={this.handleToggleModal}> 
        <LoginForm />
      </ReactModal>
      </>
    )
  }
}

const msp = (state) => ({
  session: state.session
})

const mdp = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(msp, mdp)(NavBar)