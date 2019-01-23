import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Modal from 'react-modal';
import SignUpFormContainer from '../session/signup_form_container';
import LoginFormContainer from '../session/login_form_container';
import Logo from '../../static_assets/logo';
import SearchIcon from '../../static_assets/search_icon';
import Menu from './menu';
import { changeFormType } from '../../actions/ui';

import { logout } from '../../actions/sessions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpOpen: false,
      loginOpen: false,
      seachText: '',
      
    }
  }

  openModal = (modal) => this.setState({[modal]: true})
  closeModal = (modal) => this.setState({[modal]: false})

  switchSignUpLogin = (formType) => {
    let switchFormType = formType == "Log In" ? "Sign Up" : "Log In";
    this.props.changeFormType(switchFormType);
    this.setState({
      signUpOpen: !this.state.signUpOpen,
      loginOpen: !this.state.loginOpen,
    })
  }

  handleGoogleSignIn() {
    function onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      // console.log('Name: ' + profile.getName());
      // console.log('Image URL: ' + profile.getImageUrl());
      // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
  }

  render() {
    const { session, logout } = this.props;
    const loggedIn = !isEmpty(session);
    return (
      <>
      <nav className="fixed-top-nav flex-container">
        <section className="search-wrapper flex-container">
          <Logo loggedIn={loggedIn} />
          <div className="search-input-wrapper">
            
            {loggedIn && 
              <>
                <SearchIcon />
                <input type="text" 
                  className="search-input" 
                  value={this.state.searchText} 
                  onChange={(e) => this.setState({searchText: e.target.value})}
                  placeholder={`Try "Manhattan"`}
                />
              </>
            }
            
          </div>
        </section>
        <section className="session-menu flex-container">
          <Menu 
            loggedIn={loggedIn} 
            openModal={this.openModal} 
            session={session}
            logout={logout}
            />
        </section>
      </nav>

      <Modal isOpen={this.state.loginOpen}
             onRequestClose={() => this.closeModal('loginOpen')}
             className="modal"
             overlayClassName="Overlay"
             switch={this.switchSignUpLogin}
             > 
             
             <span 
             className="button--close" 
             onClick={() => this.closeModal('loginOpen')}>&times;</span> 

             <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <LoginFormContainer switch={this.switchSignUpLogin} closeModal={() => this.closeModal('loginOpen')} />
      </Modal>

      <Modal isOpen={this.state.signUpOpen}
             onRequestClose={() => this.closeModal('signUpOpen')}
             className="modal"
             overlayClassName="Overlay"
            >

             <span 
              className="button--close" 
              onClick={() => this.closeModal('signUpOpen')}>&times;</span>

              <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <SignUpFormContainer switch={this.switchSignUpLogin} closeModal={() => this.closeModal('signUpOpen')} />
      </Modal>
      
      </>
    )
  }
}

const msp = (state) => ({
  session: state.session
})

const mdp = (dispatch) => ({
  logout: () => dispatch(logout()),
  changeFormType: (formType) => dispatch(changeFormType(formType))
})

export default connect(msp, mdp)(NavBar)
