import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import SignUpFormContainer from '../session/signup_form_container';
import LoginFormContainer from '../session/login_form_container';
import Logo from '../../static_assets/logo';
import SearchIcon from '../../static_assets/search_icon';
import Menu from './menu';
import { changeFormType, receiveSearchQuery } from '../../actions/ui';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { logout } from '../../actions/sessions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpOpen: false,
      loginOpen: false,
      address: '',
      lng: 0,
      lat: 0 
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

  handleChangeAddress = address => this.setState({ address })

  handleSelectAddress = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({
        lng:parseFloat(latLng.lng),
        lat:parseFloat(latLng.lat),
        address
      }, () => {
        // dispatch to ui state with the lat/lng info 
        const { lat, lng } = this.state;
        this.props.receiveSearchQuery({query: null})
        this.props.history.push({pathname: '/search', search: `?lat=${lat}&lng=${lng}`});
        
          // dispatch fetchListings this.state. lat long
          // pass the lat long into the instansiation of the map
          // do check for listings within the bounds of the map
          // updatelisting results and create map markers accordingly
      }))
      .catch(error => console.error('Error', error));
  };

  render() {
    const { session, logout, loggedIn } = this.props;
    const { address } = this.state;
    const classes = loggedIn || this.props.location.pathname != "/" ? 'fixed-top-nav flex-container' : 'top-nav logged-out flex-container';
    return (
      <>
      <nav className={classes}>
        <section className="search-wrapper flex-container">
          <Link to="/"><Logo locationPath={this.props.location.pathname} loggedIn={loggedIn} /></Link>
          <div className="search-input-wrapper">
            
            {(loggedIn || this.props.location.pathname != "/") && 
              <>
                <SearchIcon options={{'height':'18px','width':'18px', 'fill':'#333'}} />
                <PlacesAutocomplete
                  value={address}
                  onChange={this.handleChangeAddress}
                  onSelect={this.handleSelectAddress}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="autocomplete-dropdown-container">
                      <input
                        {...getInputProps({
                          placeholder: 'Try "Manhattan"',
                          className: 'location-search-input search-input',
                        })}
                      />
                      <div className="autocomplete-dropdown">
                        {loading && <div className="suggestion-item">Loading...</div>}
                        {suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                            const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style
                              })}
                            >
                              <span><i className="fas fa-map-marker-alt"></i> {suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
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
  session: state.session,
  loggedIn: Boolean(state.session.id)
})

const mdp = (dispatch) => ({
  logout: () => dispatch(logout()),
  changeFormType: (formType) => dispatch(changeFormType(formType)),
  receiveSearchQuery: (query) => dispatch(receiveSearchQuery(query))
})

export default withRouter(connect(msp, mdp)(NavBar))






// handleGoogleSignIn() { //BONUS
  //   function onSignIn(googleUser) {
  //     var profile = googleUser.getBasicProfile();
  //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //     console.log('Name: ' + profile.getName());
  //     console.log('Image URL: ' + profile.getImageUrl());
  //     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  //   }
  // }
