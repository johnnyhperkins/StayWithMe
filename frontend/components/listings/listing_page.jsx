import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchListing, fetchAmenitiesAndHomeTypes } from '../../actions/listings'
import Loading from '../misc/loading';
import { isInclusivelyAfterDay, DateRangePicker } from 'react-dates';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

const today = moment();

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate:'',
      endDate:'',
      focusedInput: null,
      calendarFocused: null,
      openGuestSelect: false,
      numGuests: 1,
    }
  }

  componentDidMount() {
    const { 
      fetchListing, 
      amenities, 
      home_types, 
      fetchAmenitiesAndHomeTypes 
    } = this.props;

    document.addEventListener('mousedown', this.handleClickOutsideGuestSelector);

    if(isEmpty(amenities) || isEmpty(home_types)) fetchAmenitiesAndHomeTypes();

    fetchListing(this.props.match.params.id).then(({listing}) => {
      const mapOptions = {
        center: { lat: listing.lat, lng: listing.lng },
        zoom: 13
      };
      const mapDOMNode = document.getElementById('map')
      this.map = new google.maps.Map(mapDOMNode, mapOptions);
    }); 
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideGuestSelector)
  }

  onFocusChange = (focusedInput) => {
    this.setState({
      focusedInput
    });
  }

  handleClickOutsideGuestSelector = (event) => {
    if (this.GuestSelectorRef && !this.GuestSelectorRef.contains(event.target)) {
      this.setState({openGuestSelect: false}) 
    }
  }

  setGuestSelectorRef = (node) => {
    this.GuestSelectorRef = node;
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

  handleBooking = () => {
    console.log('handle booking');
  }

  render() {
    const { listingLoading, amenities, home_types } = this.props;
    if(listingLoading) {
      return <Loading />
    }
    
    const { 
      title, 
      address, 
      price,
      amenity_ids, 
      home_type_id, 
      description,
      id,
      user_id
       
    } = this.props.listing;

    let { 
      startDate, 
      endDate, 
      focusedInput,
      numGuests,
      openGuestSelect
    } = this.state;

    return (
      <>
      <section className="image-header-container flush-top flex-container">
        <div className="left-half grid--50">
          <img src="https://s3.us-east-2.amazonaws.com/stay-with-me/IMG_0938.jpg" alt=""/>
        </div>
        <div className="right-half grid--50">
          <div className="square-image grid--50">
            <img src="https://s3.us-east-2.amazonaws.com/stay-with-me/IMG_1638.jpg" alt=""/>
          </div>
          <div className="square-image grid--50">
            <img src="https://s3.us-east-2.amazonaws.com/stay-with-me/IMG_0924.jpg" alt=""/>
          </div>
          <div className="square-image grid--50">
            <img src="https://s3.us-east-2.amazonaws.com/stay-with-me/IMG_1637.jpg" alt=""/>
          </div>
          <div className="square-image grid--50">
            <img src="https://s3.us-east-2.amazonaws.com/stay-with-me/IMG_0940.jpg" alt=""/>
          </div>
        </div>
      </section>
      <section className="content-container--interior-page flex-container">
        <section className="listing-details-container grid--75">
          {Object.values(home_types).filter(ht => ht.id == home_type_id).map(ht => <h6 className="text--maroon">{ht.name}</h6>)}
          <h2>{title} {this.props.userId == user_id && 
            <Link to={`/listings/${id}/edit`} >(<span className="text--teal-blue">Edit Listing</span>)</Link>}
          </h2>
          
          <p>{address}</p>
          <hr className="hr-24"/>
          
          <p>{description}</p>

          <hr className="hr-24"/>
          <div className="amenities">
            <p className="bold">Amenities</p>
            <ul>
            {Object.values(amenities).filter(a => amenity_ids.includes(a.id)).map(amenity => {
              return <li key={amenity.id}>{amenity.name}</li>
            })}
            </ul>
          </div>
          <hr className="hr-24"/>
          <div className="map-wrapper">
            <h4>Location</h4>
            <div id="map" ref={map => this.mapNode = map}></div>
          </div>
        </section>
        
        <aside className="floating-booking-container">
          <h3 style={{fontSize: '2.2rem'}}>${price} <span className="tiny bold">per night</span></h3>
          Rating
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
                // onOutsideClick={DayPickerRangeController.onOutsideClick}
                enableOutsideDays={false}
                numberOfMonths={1}
                // onPrevMonthClick={DayPickerRangeController.onPrevMonthClick}
                // onNextMonthClick={DayPickerRangeController.onNextMonthClick}
                onDatesChange={({ startDate, endDate }) => this.setState({ 
                    startDate, 
                    endDate, 
                    start_date: startDate && moment(startDate).format('YYYY-MM-DD HH:mm:00'),
                    end_date: endDate && moment(endDate).format('YYYY-MM-DD HH:mm:00'), 
                  })  
                } 
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
                  onFocus={() => this.setState({openGuestSelect: !openGuestSelect, openDatePicker:false})}
                  />
                {openGuestSelect && 
                <div className='guest-select-container flex-container' >
                  <p>Adults</p>
                  <button className={`button add-subtract sub ${numGuests == 1 ? 'disabled' :''}`} onClick={this.handleNumGuestChange(false)}></button>
                  <span className="guest-count">{numGuests}</span>
                  <button className="button add-subtract add" onClick={this.handleNumGuestChange(true)}></button>
                </div>}
              </div>
              <button className="button--submit" onClick={this.handleBooking}>Book</button>
        </aside>
      </section>
      </>
    )
  }
}

const msp = (state, props) => ({
  userId: state.session.id,
  listing: state.entities.listings[props.match.params.id],
  listingLoading: state.ui.listingLoading,
  amenities: state.entities.amenities,
  home_types: state.entities.home_types
})

const mdp = dispatch => ({
  fetchListing: id => dispatch(fetchListing(id)),
  fetchAmenitiesAndHomeTypes: () => dispatch(fetchAmenitiesAndHomeTypes())
})

export default withRouter(connect(msp,mdp)(Listing));
