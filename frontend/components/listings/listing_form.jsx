import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
import objectToFormData from 'object-to-formdata';
import 'react-dates/initialize';
import { isInclusivelyAfterDay, DayPickerRangeController } from 'react-dates';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Loading from '../misc/loading';
import Select from 'react-select';
import { airCon } from '../../static_assets/amenity_icons';

import moment from 'moment';

const today = moment();

//TO DO: 
// debug the slow inputs
// allow user to select which image they want to be the thumb image
// clean up error messages

class ListingForm extends Component {
  constructor(props) {
    super(props);
    const { user_id } = this.props;
    this.state = {
      listing: {
        user_id,
        title: '', 
        thumb_img_idx: 1, 
        address: '', 
        lat: 0,
        lng: 0,
        price: '100',
        home_type_id: 1,
        description: 'Testing description',
        max_guests: '5',
        start_date: '',
        end_date: '',
        photos: [], //photoUrls
        amenity_ids: [],
      },
      focusedInput: 'startDate',
      calendarFocused: null,
      endDate: null,
      startDate: null,
      selectedPhotoFiles: [] //PHOTO FILES
      
    }
  } 

  componentDidMount() {
    const { fetchListing } = this.props;
    if(!!fetchListing) {
      return fetchListing(this.props.match.params.id).then(({listing}) => {
          const startDate = moment(new Date(listing.start_date));
          const endDate = moment(new Date(listing.end_date));
          delete listing['created_at']
          delete listing['updated_at']
          this.setState({
            ...this.state,
            startDate,
            endDate,
            listing,
          })
        }
      );
    } 
  }

  cancel = () => {
    this.props.history.goBack()
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

  handleAmenities = (amenitiesArray) => {
    this.setState({
        listing: {
          ...this.state.listing,
          amenity_ids: amenitiesArray.map(amenity => amenity.value)
        } 
      }
    )
  }
  handleSubmit = () => {
    const { listing, selectedPhotoFiles } = this.state;
    delete listing['photos'];
    const formData = objectToFormData(listing, null,null, 'listing');
    const action = this.props.createListing ? this.props.createListing : this.props.updateListing;
    if (selectedPhotoFiles.length) {
      for(let i = 0; i < selectedPhotoFiles.length; i++) {
        formData.append('listing[photos][]', selectedPhotoFiles[i]);
      }
    }
    
    return action(formData).then((res) => {
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
    const { listingLoading, listing } = this.props;
    if(listingLoading) {
      return <Loading />
    }
    let { 
      startDate,
      endDate,
      focusedInput,
    } = this.state;

    const { 
      title, 
      thumb_img_idx, 
      address, 
      price, 
      amenity_ids,
      home_type_id, 
      description, 
      max_guests,
      photos
    } = this.state.listing;
    
    const { errors, home_types, amenities, formType } = this.props;

    let formattedAmenities = amenities.map(amenity => {
      return {
        value: amenity.id,
        label: amenity.name
      }
    })
    let defaultAmentities = [];
    if(amenity_ids.length) {
      defaultAmentities = formattedAmenities.filter(a => amenity_ids.includes(a.value))
    }
    const startDateString = startDate && moment(startDate).format('ddd, MMM Do');
    const endDateString = endDate && moment(endDate).format('ddd, MMM Do');

    return (
      <section className="flex-container create-listing">
        <section className="content-container grid--50">
          <h2>{formType == "Edit Listing" ? "Edit your listing" : 'Lets get started listing your place.'}</h2>
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
                  <div className="basic-multi-select-wrapper">
                  <Select
                      defaultValue={defaultAmentities}
                      isMulti
                      options={formattedAmenities}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      // onInputChange={this.handleAmenities}
                      onChange={this.handleAmenities}
                    />
                  </div>        
                </label>
                <label>Describe your listing
                <textarea 
                  className="text-area" 
                  name="description"
                  value={description} 
                  onChange={this.handleInput} 
                  >{description}</textarea>
                </label>
                <label>Max guests
                  <input 
                    className="text-input"
                    type="number" 
                    placeholder="Max Guests"
                    name="max_guests"
                    value={max_guests} 
                    onChange={this.handleInput} 
                  />
                </label>
                <input 
                  type="file" 
                  id="file"
                  onChange={e => this.setState({ selectedPhotoFiles: e.target.files })}
                  multiple />
                <label htmlFor="file" className="upload-button">Add Photos</label>
                {!!this.state.selectedPhotoFiles.length && <p>{this.state.selectedPhotoFiles.length} files selected</p>}    
                  {(photos && photos.length) ?
                    <div className="flex-container--no-justify photos-container">
                      { photos.map((url, idx) => <div key={idx} className="listing-thumb square-image" style={{backgroundImage: `url(${url})`}} />) }
                    </div> : null
                  }
                <hr className="hr-24" />
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
          <section className="flex-container--no-justify submit-container">
            <button 
              onClick={this.handleSubmit} 
              className="button--submit inline-block grid--33" >
              {this.props.savingListing ? 'Saving...' : formType}
            </button>

            <button 
            className="button--cancel button--outlined inline-block grid--33" 
            onClick={this.cancel}>Cancel</button>
          </section>  
        </section>
        <aside className="grid--50">
          <img src="https://s3.us-east-2.amazonaws.com/stay-with-me/b12a70f632d3d127a38a67afde7cc8ec.png" alt=""/>
        </aside>
      </section>
    )
  }
}

export default ListingForm