import React, { Component } from 'react';
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

  openModal = (modal) => this.setState({[modal]: true})
  closeModal = (modal) => this.setState({[modal]: false})

  render() {
    const { session, logout } = this.props;
    return (
      <>
      <nav>
        { isEmpty(session) ? 
        <>
          <span onClick={() => this.openModal('signUpOpen')} >Sign Up</span>
          <span onClick={() => this.openModal('loginOpen')} >Log In</span>
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
      <ReactModal isOpen={this.state.loginOpen}
                  onRequestClose={() => this.closeModal('loginOpen')}> 
        <LoginForm closeModal={this.closeModal} />
      </ReactModal>
      <ReactModal isOpen={this.state.signUpOpen}
                  onRequestClose={() => this.closeModal('signUpOpen')}> 
        <SignUpForm closeModal={this.closeModal} />
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