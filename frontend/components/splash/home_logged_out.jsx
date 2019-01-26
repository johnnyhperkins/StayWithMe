import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../nav/navbar';
import 'react-dates/initialize';
import { isInclusivelyAfterDay, DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import SearchIcon from '../../static_assets/search_icon';

const today = moment();

class HomeLoggedOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      startDate: '',
      endDate: '',
      numGuests: 1,
      focusedInput: 'startDate',
      calendarFocused: null,
      selectedInput: 1,
      openDatePicker: false,
      openGuestSelect: false,
      errors: ''
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
    // TO DO implement search functionality
    console.log('perform search', this.state);
  }

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
    const { startDate, endDate, numGuests, openGuestSelect, location, errors } = this.state;
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
                  <input 
                    type="text" 
                    placeholder="Manhattan, NY" 
                    value={location}
                    onChange={(e) => this.setState({'location': e.target.value})}/>
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
            <div className="search-icon-wrapper">
              <SearchIcon options={{'height':'28px','width':'28px', 'fill':'#fff'}} onClick={this.search} />
            </div>
          </div>
        </section>
      </section>
    )
  }
}

const mdp = dispatch => ({
  // searchListings: (query) => dispatch(searchListings)
})


export default connect(mdp)(HomeLoggedOut);