import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import LoginFormContainer from '../session/login_form_container';
import Logo from '../../static_assets/logo';
import SearchIcon from '../../static_assets/search_icon';
import Menu from './menu';
import { 
  receiveSearchQuery, 
  toggleLoginModal 
} from '../../actions/ui';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { logout } from '../../actions/sessions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lng: 0,
      lat: 0 
    }
  }

  openModal = (modal) => this.props.toggleLoginModal(modal, true)
  closeModal = (modal) => this.props.toggleLoginModal(modal, false)

  handleChangeAddress = address => this.setState({ address })

  handleSelectAddress = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({
        lng:parseFloat(latLng.lng),
        lat:parseFloat(latLng.lat),
        address
      }, () => {
        const { lat, lng } = this.state;
        this.props.history.push({pathname: '/search', search: `?lat=${lat}&lng=${lng}`});
        
      }))
      .catch(error => console.error('Error', error));
  };

  render() {
    const { 
      session, 
      logout, 
      loggedIn, 
      sessionModalOpen, 
      sessionModalType,
      toggleLoginModal } = this.props;
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

      <Modal isOpen={sessionModalOpen}
             onRequestClose={() => toggleLoginModal(sessionModalType, false)}
             className="modal"
             overlayClassName="Overlay"
             switch={this.switchSignUpLogin}
             > 
             
             <span 
             className="button--close" 
             onClick={() => toggleLoginModal(sessionModalType, false)}>&times;</span> 

        <LoginFormContainer  
          switch={this.switchSignUpLogin} 
          closeModal={() => toggleLoginModal(sessionModalType, false)} 
          sessionModalType={sessionModalType}
          />
      </Modal>
      
      </>
    )
  }
}

const msp = (state) => ({
  session: state.session,
  loggedIn: Boolean(state.session.id),
  sessionModalOpen: state.ui.sessionModalOpen,
  sessionModalType: state.ui.sessionModalType
})

const mdp = (dispatch) => ({
  logout: () => dispatch(logout()),
  changeFormType: (formType) => dispatch(changeFormType(formType)),
  receiveSearchQuery: (query) => dispatch(receiveSearchQuery(query)),
  toggleLoginModal: (modal,bool) => dispatch(toggleLoginModal(modal,bool))
})

export default withRouter(connect(msp, mdp)(NavBar))
