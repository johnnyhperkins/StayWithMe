import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'react-dates/initialize';
import { isInclusivelyAfterDay, DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import {receiveSearchQuery } from '../../actions/ui';
import SearchIcon from '../../static_assets/search_icon';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const today = moment();

class HomeLoggedOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lng: 0,
      lat: 0,
      startDate: '',
      endDate: '',
      numGuests: 1,
      focusedInput: 'startDate',
      calendarFocused: null,
      openDatePicker: false,
      openGuestSelect: false,
      errors: '',
    } 
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutsideDatePicker);
    document.addEventListener('mousedown', this.handleClickOutsideGuestSelector);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideDatePicker);
    document.removeEventListener('mousedown', this.handleClickOutsideGuestSelector)
  }

  handleClickOutsideDatePicker = (event) => {
    if (this.DatePickerRef && !this.DatePickerRef.contains(event.target)) {
      this.setState({openDatePicker: false})
    }
  }

  setDatePickerRef = (node) => {
    this.DatePickerRef = node;
  }

  handleClickOutsideGuestSelector = (event) => {
    if (this.GuestSelectorRef && !this.GuestSelectorRef.contains(event.target)) {
      this.setState({openGuestSelect: false}) 
    }
  }

  setGuestSelectorRef = (node) => {
    this.GuestSelectorRef = node;
  }
  
  search = () => {
    // TO DO implement add date filter
    const { lat, lng } = this.state;
    this.props.receiveSearchQuery({query: null})
    this.props.history.push({pathname: '/search', search: `?lat=${lat}&lng=${lng}`});
  }

  handleChangeAddress = address => this.setState({ address })

  handleSelectAddress = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({
        lng:parseFloat(latLng.lng),
        lat:parseFloat(latLng.lat),
        address
      }))
      .catch(error => console.error('Error', error));
  };

  onFocusChange = (focusedInput) => {
    let { startDate } = this.state;
    this.setState({
      focusedInput: !focusedInput ? 'startDate' : focusedInput,
    }, () => {
      if(!!startDate && !!this.state.endDate) {
        if(startDate < this.state.endDate) {
          this.setState({openDatePicker:false, errors:''}, () => this.guestSelect.focus())
        } 
      }
    });
  }

  handleNumGuestChange(add) {
    let { numGuests } = this.state;
    return () => {
      if( numGuests > 0 ) {
        if(add) {
          this.setState({numGuests: ++numGuests})
        } else if(numGuests > 1) {
          this.setState({numGuests: --numGuests})
        }  
      }
    }
  }

  handleOpenDatePicker = () => {
    this.setState({openDatePicker: !this.state.openDatePicker, openGuestSelect: false})
  }
  
  render() {
    const { startDate, endDate, numGuests, openGuestSelect, address, errors } = this.state;
    const startDateString = startDate && startDate.format('ddd, MMM Do');
    const endDateString = endDate && endDate.format('ddd, MMM Do');

    return (
      <section className="home-splash-container">
        <section className="content-container">
          <h1 className="text--white">Plan your next trip</h1>
          <div className="search-container flex-container">
            <div className="search-inputs">
              <div className="search-input-wrapper">
                <label>
                  <p>City, Address, Landmark</p>
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
                        <div className="autocomplete-dropdown autocomplete-dropdown--splash">
                          {loading && <div className="suggestion-item">Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                              const style = suggestion.active
                              ? { backgroundColor: "#fafafa", "cursor": "pointer" }
                              : { backgroundColor: "#ffffff", "cursor": "pointer" };
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
                </label>
              </div>
              <div className="date-input-wrapper" ref={this.setDatePickerRef}>
                <div className="date-picker-table">
                  <div className="date-picker-table-cell">
                    <label>
                      <p>Check In</p>
                      <input 
                        onClick={this.handleOpenDatePicker} 
                        type="text" 
                        name="start date" 
                        value={startDateString} 
                        placeholder="mm/dd/yyyy"
                        readOnly />
                    </label>
                  </div>
                  <div className="date-picker-table-cell">
                    <label>
                      <p>Check Out</p>
                      <input 
                        type="text" 
                        name="end date" 
                        value={endDateString} 
                        placeholder="mm/dd/yyyy"
                        readOnly
                        onClick={this.handleOpenDatePicker}
                         />
                    </label>
                  </div>
                  {this.state.openDatePicker && 
                    <div className="range-controller-wrapper">
                      <span>{errors && errors}</span>
                      <DayPickerRangeController
                        startDate={this.state.startDate}
                        noBorder={true}
                        endDate={this.state.endDate}
                        isOutsideRange={day => isInclusivelyAfterDay(today, day)}
                        onOutsideClick={DayPickerRangeController.onOutsideClick}
                        enableOutsideDays={false}
                        numberOfMonths={2}
                        onPrevMonthClick={DayPickerRangeController.onPrevMonthClick}
                        onNextMonthClick={DayPickerRangeController.onNextMonthClick}
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} 
                        focusedInput={this.state.focusedInput} 
                        onFocusChange={this.onFocusChange} 
                      />

                    </div>
                  }
                </div>
              </div>
              <div 
                className="guest-input-wrapper"
                ref={this.setGuestSelectorRef} >
                <label>
                <p>Guests</p>
                <input 
                  type="text" 
                  placeholder="1 guest" 
                  value={`${numGuests} guest${numGuests > 1 ? 's' : ''}`} 
                  ref={(input) => this.guestSelect = input}
                  readOnly       
                  onFocus={() => this.setState({openGuestSelect: !openGuestSelect, openDatePicker:false})}
                  />
                </label>
                {openGuestSelect && 
                <div className='guest-select-container flex-container' >
                  <p>Adults</p>
                  <button className={`button add-subtract sub ${numGuests == 1 ? 'disabled' :''}`} onClick={this.handleNumGuestChange(false)}></button>
                  <span className="guest-count">{numGuests}</span>
                  <button className="button add-subtract add" onClick={this.handleNumGuestChange(true)}></button>
                </div>}
              </div>
            </div>
            <div className="search-icon-wrapper" onClick={this.search}>
              <SearchIcon options={{'height':'28px','width':'28px', 'fill':'#fff'}}  />
            </div>
          </div>
        </section>
      </section>
    )
  }
}

const mdp = dispatch => ({
  receiveSearchQuery: (query) => dispatch(receiveSearchQuery(query))
})


export default withRouter(connect(null,mdp)(HomeLoggedOut));