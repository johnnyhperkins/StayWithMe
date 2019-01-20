import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { logout } from '../../actions/sessions';

class NavBar extends Component {

  render() {
    const { session, logout } = this.props;
    return (
      <nav>
        { isEmpty(session) ? 
        <>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Log In</Link>
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