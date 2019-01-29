import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
import objectToFormData from 'object-to-formdata';
import 'react-dates/initialize';
import { isInclusivelyAfterDay, DayPickerRangeController } from 'react-dates';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import moment from 'moment';

const today = moment();

//TO DO: 
// debug the slow inputs
// allow user to select which image they want to be the thumb image

class ListingForm extends Component {
  constructor(props) {
    super(props);
    const { user_id } = this.props;
    this.state = {
      listing: {
        user_id,
        title: 'Testing', 
        thumb_img_idx: 1, 
        address: '', 
        lat: 0,
        lng: 0,
        price: props.listing ? (props.listing.price / 100).toString() : '100',
        home_type_id: 1,
        description: 'Testing description',
        max_guests: '5',
        start_date: '',
        end_date: '',
        images: [],
        amenity_ids: [],
      },
      focusedInput: 'startDate',
      calendarFocused: null,
      endDate: '',
      startDate: '',
      imageFile: '',
      imageUrl: '',
      photos: []
      
    }
  }  

  componentDidMount() {
    const { fetchAmenitiesAndHomeTypes } = this.props;
    fetchAmenitiesAndHomeTypes();
  }

  onFocusChange = (focusedInput) => {
    this.setState({
      focusedInput: !focusedInput ? 'startDate' : focusedInput,
    });
  }

  handleInput = (e) => {
    this.setState({
      listing: {
        ...this.state.listing,
        [e.target.name]: e.target.value
      },
    })
  }

  onPriceChange = (e) => {
      const price = e.target.value;
      if( !price || price.match(/^\d{1,}(\.\d{0,2})?$/) ) {
          this.setState(() => ({ 
            listing: { 
              ...this.state.listing,
              price
            } 
          }
        ));
      }
  }

  handleAmenities = (e) => {
    const { amenity_ids } = this.state.listing;
    const id = e.target.value;
    const updatedAmenities = amenity_ids.includes(id) ? amenity_ids.filter(i => i !== id) : amenity_ids.concat([id]);
    this.setState({
        listing: {
          ...this.state.listing,
          amenity_ids: updatedAmenities
        } 
      }
    )
  }

  handleSubmit = () => {
    const { listing, photos } = this.state;
    const formData = objectToFormData(listing, null,null, 'listing');
    for(let i = 0; i < photos.length; i++) {
      formData.append('listing[photos][]', photos[i]);
    }
    return this.props.createListing(formData).then((res) => {
      this.props.history.push(`/listings/${res.listing.id}`)
    })
  }

  handleChangeAddress = address => {
    this.setState({ listing: {
          ...this.state.listing,
          address
        } });
  };

  handleSelectAddress = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({
        listing: {
          ...this.state.listing,
          lng:parseFloat(latLng.lng),
          lat:parseFloat(latLng.lat),
          address
      }}))
      .catch(error => console.error('Error', error));
  };

  render() {
    let { 
      startDate,
      endDate,
      focusedInput,
      imageUrl
    } = this.state;

    const { 
      title, 
      thumb_img_idx, 
      address, 
      price, 
      home_type_id, 
      description, 
      max_guests, 
      images,
    } = this.state.listing;

    const { errors, home_types, amenities } = this.props;
    const startDateString = startDate && moment(startDate).format('ddd, MMM Do');
    const endDateString = endDate && moment(endDate).format('ddd, MMM Do');
    return (
      <section className="content-container grid--75">
        <h2>Lets get started listing your place.</h2>
        <div className="form-wrapper listing-form">
        {/* {!isEmpty(messages) && messages.map((m, idx) => <p key={idx} >{m}</p>)} */}
              <label>Title
                <input 
                  className="text-input"
                  type="text" 
                  placeholder="Title"
                  name="title"
                  value={title} 
                  onChange={this.handleInput} 
                  />
              </label>

              <label>Photos
               <input 
                type="file"
                className="text-input"
                onChange={e => this.setState({ photos: e.target.files })}
                multiple
                />
                { imageUrl && <img src={imageUrl} className="thumb-img" /> }
              </label>

              <PlacesAutocomplete
                value={address}
                onChange={this.handleChangeAddress}
                onSelect={this.handleSelectAddress}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div className="autocomplete-dropdown-container">
                    <label>Address
                      <input
                        {...getInputProps({
                          placeholder: 'Find your address...',
                          className: 'location-search-input text-input',
                        })}
                      />
                      </label>
                    <div className="autocomplete-dropdown">
                      {loading && <div>Loading...</div>}
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

              <label>Price Per Night
                <input 
                  className="text-input"
                  type="text" 
                  placeholder="Price"
                  name="price"
                  value={price} 
                  onChange={this.onPriceChange} 
                /> 
              </label>

              <label>Home Type
                <select name="home_type_id" value={home_type_id} className="select" onChange={this.handleInput}>
                  <option value=''>Select Home Type</option>
                  {home_types.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                </select>
              </label>
              
              <label>Select Amenities
                <div className="flex-container checkbox-wrapper">
                  { amenities.map(amenity => <label key={amenity.id}>{amenity.name}<input className="checkbox" onChange={this.handleAmenities} type="checkbox" value={amenity.id} key={amenity.id}/></label>) }
                  </div>
              </label>
              
              <textarea 
                className="text-area" 
                name="description"
                value={description} 
                onChange={this.handleInput} 
                >{description}</textarea>

              <label>Max Guests</label>
              <input 
                className="text-input"
                type="number" 
                placeholder="Max Guests"
                name="max_guests"
                value={max_guests} 
                onChange={this.handleInput} 
                />

              <div className="flex-container--no-justify">
                <label className="inline">
                  <p>Available From:</p>
                  <input 
                    type="text" 
                    name="start_date" 
                    className="text-input"
                    value={startDateString} 
                    placeholder="mm/dd/yyyy"
                    readOnly />
                </label>
                <label>
                  <p>Until:</p>
                  <input 
                    type="text" 
                    className="text-input"
                    name="end_date" 
                    value={endDateString} 
                    placeholder="mm/dd/yyyy"
                    readOnly
                    />
                </label>
              </div>
              <DayPickerRangeController
                startDate={startDate}
                endDate={endDate}
                isOutsideRange={day => isInclusivelyAfterDay(today, day)}
                onOutsideClick={DayPickerRangeController.onOutsideClick}
                enableOutsideDays={false}
                numberOfMonths={2}
                onPrevMonthClick={DayPickerRangeController.onPrevMonthClick}
                onNextMonthClick={DayPickerRangeController.onNextMonthClick}
                onDatesChange={({ startDate, endDate }) => this.setState({ 
                    startDate, 
                    endDate, 
                    listing: {
                      ...this.state.listing,
                      start_date: startDate && moment(startDate).format('YYYY-MM-DD HH:mm:00'),
                      end_date: endDate && moment(endDate).format('YYYY-MM-DD HH:mm:00'), 
                    }
                  })  
                } 
                focusedInput={focusedInput} 
                onFocusChange={this.onFocusChange} 
              />
          
          { !isEmpty(errors) && (
              <>
              <ul className="session-errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
              </>
              ) 
          }
        </div>
        <section>
          <button onClick={this.handleSubmit} className="button--submit inline-block" >Save</button>
        </section>  
      </section>
    )
  }
}

export default ListingForm