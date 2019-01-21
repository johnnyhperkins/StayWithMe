import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Modal from 'react-modal';
import SignUpFormContainer from '../session/signup_form_container';
import LoginFormContainer from '../session/login_form_container';
import Logo from '../../static_assets/logo';
import SearchIcon from '../../static_assets/search_icon';

import { logout } from '../../actions/sessions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpOpen: false,
      loginOpen: false,
      seachText: ''
    }
  }

  openModal = (modal) => this.setState({[modal]: true})
  closeModal = (modal) => this.setState({[modal]: false})

  render() {
    const { session, logout } = this.props;
    return (
      <>
      <nav className="fixed-top-nav flex-container">
        <section className="search-wrapper flex-container">
          <Logo />
          <div className="search-input-wrapper">
            <SearchIcon />
            <input type="text" 
              className="search-input" 
              value={this.state.searchText} 
              onChange={(e) => this.setState({searchText: e.target.value})}
              placeholder={`Try "Manhattan"`}
            />
          </div>
        </section>
        <section className="session-menu flex-container">
          <button className="button--navlink">Become a Host</button>
          { isEmpty(session) ? 
          <>
          <button className="button--navlink" onClick={() => this.openModal('signUpOpen')} >Sign Up</button>
          <button className="button--navlink" onClick={() => this.openModal('loginOpen')} >Log In</button>
          </> : ( 
          <>
          <p>Welcome {session.username}</p>
          <button className="button--navlink" onClick={logout}>Log Out</button>
          </> )}
        </section>
      </nav>

      <Modal isOpen={this.state.loginOpen}
             onRequestClose={() => this.closeModal('loginOpen')}
             className="modal"
             overlayClassName="Overlay"> 
             <span 
             className="button--close" 
             onClick={() => this.closeModal('loginOpen')}>&times;</span> 
        <LoginFormContainer closeModal={() => this.closeModal('loginOpen')} />
      </Modal>

      <Modal isOpen={this.state.signUpOpen}
             onRequestClose={() => this.closeModal('signUpOpen')}
             className="modal"
             overlayClassName="Overlay">
             <span 
              className="button--close" 
              onClick={() => this.closeModal('signUpOpen')}>&times;</span> 
        <SignUpFormContainer closeModal={() => this.closeModal('signUpOpen')} />
      </Modal>
      
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
