import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isInclusivelyAfterDay, DateRangePicker, DayPickerRangeController } from 'react-dates';
import { receiveMessages } from '../../actions/ui';
import { createBooking, receiveBookingErrors } from '../../actions/bookings'

import { toggleLoginModal } from '../../actions/ui';

import _ from 'lodash';

import SmallRating from '../misc/small_ratings';
import moment from 'moment';

const today = moment();

class ListingSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate:null,
      endDate:null,
      calendarFocused: null,
      openGuestSelect: false,
      numGuests: 1,
      focusedInput: null,
      start_date: '',
      end_date: ''
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutsideGuestSelector);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideGuestSelector)
  }

  onFocusChange = (focusedInput) => {
    console.log(focusedInput);
    this.setState({ focusedInput });
  }

  handleClickOutsideGuestSelector = (event) => {
    if (this.GuestSelectorRef && !this.GuestSelectorRef.contains(event.target)) {
      this.setState({ openGuestSelect: false }) 
    }
  }

  setGuestSelectorRef = (node) => {
    this.GuestSelectorRef = node;
  }

  handleNumGuestChange(add) {
    let { numGuests } = this.state;
    const {max_guests} = this.props.listing;
    return () => {
      if( numGuests > 0) {
        if(add && numGuests < max_guests) {
          this.setState({ numGuests: ++numGuests })
        } else if(numGuests > 1 && !add) {
          this.setState({ numGuests: --numGuests })  
        }
      }
    }
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({
      startDate, 
      endDate, 
      start_date: startDate && moment(startDate).format('YYYY-MM-DD HH:mm:00'),
      end_date: endDate && moment(endDate).format('YYYY-MM-DD HH:mm:00'), 
    })  
  }

  handleBooking = () => {
    const { 
      receiveMessages, 
      toggleLoginModal,
      createBooking, 
      userId,
      listing,
      receiveBookingErrors
    } = this.props; 
    
    if(!userId) {
      receiveMessages(["Please log in to make a booking."])
      return toggleLoginModal('login', true)
    }

    if(userId == listing.user_id) {
      return receiveBookingErrors(["You cannot book your own listing."])
    }

    const { 
      numGuests, 
      start_date, 
      end_date
    } = this.state;
    
    const booking = {
      listing_id: this.props.match.params.id,
      guest_count: numGuests,
      start_date,
      end_date
    }

    return createBooking(booking).then(() => {
      this.props.history.push(`/users/${userId}`)
    });
  }

  render() {
    const { 
      listing,
      booking_errors
    } = this.props;
    
    const { 
      numGuests,
      focusedInput,
      openGuestSelect,
      startDate,
      endDate
    } = this.state;

    return (
      <aside className="floating-booking-container">
        <h3 style={{fontSize: '2.2rem'}}>${listing.price} <span className="tiny bold">per night</span></h3>
        <SmallRating listing={listing} />
        <hr className="hr-16"/>
        <p className="tiny bold">Dates</p>
        <DateRangePicker
          startDate={startDate}
          startDateId="your_unique_start_date_id" 
          endDate={endDate}
          endDateId="your_unique_end_date_id" 
          startDatePlaceholderText="Check In"
          endDatePlaceholderText="Check Out"
          isOutsideRange={day => isInclusivelyAfterDay(today, day)}
          enableOutsideDays={false}
          numberOfMonths={1}
          onDatesChange={this.onDatesChange} 
          focusedInput={focusedInput} 
          onFocusChange={this.onFocusChange} 
        />
        <div 
          className="guest-input-wrapper"
          ref={this.setGuestSelectorRef} >
          
          <p className="tiny bold">Guests</p>
          <input 
            type="text" 
            className="text-input"
            placeholder="1 guest" 
            value={`${numGuests} guest${numGuests > 1 ? 's' : ''}`} 
            ref={(input) => this.guestSelect = input}
            readOnly       
            onFocus={() => this.setState({
              openGuestSelect: !openGuestSelect, 
              openDatePicker:false
            })}
            />
          {openGuestSelect && 
          <div className='guest-select-container' >
            <div className="pos-relative flex-container">
              <p>Adults</p>
              <button className={`button add-subtract sub ${numGuests == 1 ? 'disabled' :''}`} onClick={this.handleNumGuestChange(false)}></button>
              <span className="guest-count">{numGuests}</span>
              <button className={`button add-subtract add ${numGuests == listing.max_guests ? 'disabled' :''}`} onClick={this.handleNumGuestChange(true)}></button>

              <span className="apply-search" onClick={() => this.setState({openGuestSelect:false})}>Apply</span>
            </div>
          </div>}
        </div>
        <button className="button--submit" onClick={this.handleBooking}>Book</button>
        { !_.isEmpty(booking_errors) && (
          <>
          <ul className="session-errors">
            {booking_errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          </>
          ) 
        }
      </aside>
    )
  }
}

const msp = state => ({
  userId: state.session.id,
  booking_errors: state.errors.booking,
})

const mdp = dispatch => ({
  createBooking: (booking) => dispatch(createBooking(booking)),
  receiveMessages: (messages) => dispatch(receiveMessages(messages)),
  receiveBookingErrors: (errors) => dispatch(receiveBookingErrors(errors)),
  toggleLoginModal: (modal, bool) => dispatch(toggleLoginModal(modal,bool))
})

export default withRouter(connect(msp,mdp)(ListingSidebar));