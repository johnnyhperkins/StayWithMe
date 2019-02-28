import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import moment from 'moment';
import queryString from 'query-string';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import LoginFormContainer from '../session/login_form_container';
import Logo from '../../static_assets/logo';
import SearchIcon from '../../static_assets/search_icon';
import Menu from './menu';
import { toggleLoginModal } from '../../actions/ui';
import { logout } from '../../actions/sessions';
import SearchFilterBar from '../search/filter_bar';

import { setFilter } from '../../actions/filters';

class NavBar extends Component {
  constructor(props) {
    super(props);
    const query = props.location.pathname == "/search" ? queryString.parse(this.props.location.search) : null;
    this.state = {
      address: '',
      lat: query && query.lat ? parseFloat(query.lat) : 0,
      lng: query && query.lng ? parseFloat(query.lng) : 0,
      start_date: query && query.start_date ? query.start_date : moment().format('YYYY-MM-DD'),
      end_date: query && query.end_date ? query.end_date : moment().add(2, 'days').format('YYYY-MM-DD'),
      numGuests: query && query.max_guests ? parseInt(query.max_guests) : 1,
      openDatePicker: false,
      openPriceSlider: false,
      openGuestSelect: false,
      focusedInput: 'startDate',
      calendarFocused: null,
      startDate: query && query.start_date ? moment(query.start_date) : moment(),
      endDate: query && query.end_date ? moment(query.end_date) : moment().add(2, 'days'),
      price: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props

    if(prevProps.location !== location && !_.isEqual(prevState, this.state)) {
      if(location.pathname == "/search") {
        const query = queryString.parse(location.search);
        this.setState({
          numGuests: query.max_guests,
          startDate: moment(query.start_date),
          endDate: moment(query.end_date),
        })
      }
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
        this.search()
      }))
      .catch(error => console.error('Error', error));
  };

  search = () => {
    const {
      address,
      lat,
      lng,
      start_date, 
      end_date, 
      numGuests,
      price 
    } = this.state;

    const { setFilter } = this.props;

    if( start_date && 
        end_date && 
        ( (lat > 0 && lng > 0) || address ) ) {
      
      setFilter({
        lat,
        lng,
        start_date, 
        end_date, 
        price,
        max_guests: numGuests
      });
      
      this.setState({
        openDatePicker: false,
        openGuestSelect: false,
        openPriceSlider: false
      }, () => {
        const urlString = queryString.stringify({
          lat,
          lng,
          start_date,
          end_date,
          max_guests: numGuests,
          price
        })
        return window.location = '/#/search?' + urlString;
      })
      
    } else if(!address) {
      this.addressInput.focus()
    } else if(!(start_date && end_date)) {
      this.setState({openDatePicker: !this.state.openDatePicker})
    }
  }

  handlePriceChange = (price) => {
    this.setState({
      price
    })
  }
 
  handleNumGuestChange = (add) => {
    let { numGuests } = this.state;

    return () => {
      if( numGuests >= 0 && numGuests < 20) {
        if(add) {
          this.setState({numGuests: ++numGuests})
        } else if(numGuests > 1) {
          this.setState({numGuests: --numGuests})
        }  
      }
    }
  }

  handleOpenGuestSelect = () => {
    this.setState({
      openGuestSelect: !this.state.openGuestSelect, 
      openDatePicker: false,
      openPriceSlider: false
    })
  }

  handleOpenPriceFilter = () => {
    this.setState({
      openGuestSelect: false, 
      openDatePicker: false,
      openPriceSlider: !this.state.openPriceSlider,
    })
  }

  handleOpenDatePicker = () => {
    this.setState({
      openDatePicker: !this.state.openDatePicker, 
      openGuestSelect: false,
      openPriceSlider: false
    })
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ 
      startDate, 
      endDate 
    }, () => {
      const start_date = moment(startDate).format('YYYY-MM-DD');
      const end_date = moment(endDate).format('YYYY-MM-DD');
      this.setState({start_date, end_date});
    })
  }

  onFocusChange = (focusedInput) => {
    // NOTE: when destructuring endDate, this function doesn't work properly
    let { startDate, numGuests } = this.state;
    this.setState({
      focusedInput: !focusedInput ? 'startDate' : focusedInput,
    }, () => {
      if(!!startDate && !!this.state.endDate) {
        if(startDate < this.state.endDate && numGuests == 0) {
          this.handleOpenGuestSelect()
        } 
      }
    });
  }
  
  render() {
    const { 
      session, 
      logout, 
      loggedIn, 
      sessionModalOpen, 
      sessionModalType,
      toggleLoginModal 
    } = this.props;
    
    const { address } = this.state;
    
    const classes = loggedIn || this.props.location.pathname != "/" ? 'fixed-top-nav flex-container' : 'top-nav logged-out flex-container';
    return (
      <>
      <nav className={classes}>
        <section className="search-wrapper flex-container">
          <Link to="/">
            <Logo locationPath={this.props.location.pathname} loggedIn={loggedIn} />
          </Link>
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
                          ref: (input) => this.addressInput = input
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
      
      { ( (loggedIn && this.props.location.pathname == "/") || 
        this.props.location.pathname == "/search") && 
        // make a function that conditionally passes certain props based on location?
        <SearchFilterBar
          {...this.state}
          handleOpenPriceFilter={this.handleOpenPriceFilter}
          handlePriceChange={this.handlePriceChange}
          handleOpenGuestSelect={this.handleOpenGuestSelect}
          handleOpenDatePicker={this.handleOpenDatePicker}
          handleNumGuestChange={this.handleNumGuestChange}
          onFocusChange={this.onFocusChange}
          onDatesChange={this.onDatesChange}
          search={this.search}
        />
      }

      <Modal 
        isOpen={sessionModalOpen}
        onRequestClose={() => toggleLoginModal(sessionModalType, false)}
        className="modal"
        overlayClassName="Overlay"
        switch={this.switchSignUpLogin}> 
             
        <span 
          className="button--close" 
          onClick={() => toggleLoginModal(sessionModalType, false)}>&times;</span> 

        <LoginFormContainer  
          switch={this.switchSignUpLogin} 
          closeModal={() => toggleLoginModal(sessionModalType, false)} 
          sessionModalType={sessionModalType} />

      </Modal>
      
      </>
    )
  }
}

const msp = (state) => ({
  session: state.session,
  loggedIn: Boolean(state.session.id),
  sessionModalOpen: state.ui.sessionModalOpen,
  sessionModalType: state.ui.sessionModalType,
  filter: state.filters
})

const mdp = (dispatch) => ({
  logout: () => dispatch(logout()),
  changeFormType: (formType) => dispatch(changeFormType(formType)),
  toggleLoginModal: (modal,bool) => dispatch(toggleLoginModal(modal,bool)),
  setFilter: (filter) => dispatch(setFilter(filter))
})

export default withRouter(connect(msp, mdp)(NavBar))
