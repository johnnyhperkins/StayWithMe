import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
import objectToFormData from 'object-to-formdata';
import 'react-dates/initialize';
import { isInclusivelyAfterDay, DayPickerRangeController } from 'react-dates';
import PlacesAutocompleteComponent from '../misc/places_autocomplete_component';
import  { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Loading from '../misc/loading';
import Select from 'react-select';

import moment from 'moment';

const today = moment();
// TO DO: allow user to select which image they want to be the thumb image

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
        price: '',
        home_type_id: 1,
        description: '',
        max_guests: '1',
        start_date: '',
        end_date: '',
        photos: [], //photoUrls
        amenity_ids: [],
      },
      focusedInput: 'startDate',
      calendarFocused: null,
      endDate: undefined,
      startDate: undefined,
      selectedPhotoFiles: [], //PHOTO FILES
      fieldErrors: {},
      hasErrors: false
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
          listing['photos'] = listing.urls_and_ids
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

  checkBlockedDays = (day) => {
    if(this.props.listing) {
      const { listing, listing: { booked_dates } } = this.props;
      day = moment(day).format('YYYY-MM-DD');    
    
      return booked_dates.filter(booking => 
        moment(day).isBetween( 
          moment(booking.start_date).subtract(1, 'd'),
          booking.end_date, null, '()') && 
        booking.status == "APPROVED").length || 
        moment(day).isBefore(moment(listing.start_date).subtract(1, 'd')) ||
        moment(day).isAfter(listing.end_date)
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.errors.length !== this.props.errors.length ) {
      window.scrollTo(0, 0);
    }
  }

  cancel = () => this.props.history.goBack()

  onFocusChange = (focusedInput) => {
    this.setState({
      focusedInput: !focusedInput ? 'startDate' : focusedInput,
    });
  }

  handleNumGuestChange = (e) => {
    const val = e.target.value;
    if( val >= 1 && val < 21) {
      this.setState({
        listing: {
          ...this.state.listing,
          max_guests: val
        }
      })
    }
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
    const { hasErrors, fieldErrors } = this.checkForEmptyFields();
    this.setState({savingListing: true})

    if(hasErrors) {
      this.setState({ fieldErrors, hasErrors: true, savingListing:false });
      window.scrollTo(0, 0);
    } else {
      const { listing, selectedPhotoFiles } = this.state;
      let newIds, oldIds, photoIdsToDelete = [];

      if( this.props.formType == 'Edit Listing' && 
          listing.photos && 
          listing.urls_and_ids ) {
        newIds = listing.photos.map(photo => photo.id);
        oldIds = listing.urls_and_ids.map(photo => photo.id);
        photoIdsToDelete = _.difference(oldIds, newIds);
      }
      
      delete listing['photos'];
      const formData = objectToFormData(listing, null,null, 'listing');
      const action = this.props.createListing ? this.props.createListing : this.props.updateListing;

      if (selectedPhotoFiles.length) {
        for(let i = 0; i < selectedPhotoFiles.length; i++) {
          formData.append('listing[photos][]', selectedPhotoFiles[i]);
        }
      }

      if (photoIdsToDelete.length) {
        for(let i = 0; i < photoIdsToDelete.length; i++) {
          formData.append('listing[photos_to_delete][]', photoIdsToDelete[i]);
        }
      }
      
      return action(formData).then((res) => {
        this.props.history.push(`/listings/${res.listing.id}`)
      })
    }
  }
   
  handleChangeAddress = address => {
    this.setState({ 
      listing: {
        ...this.state.listing,
        address
      } 
    });
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
        },
        fieldErrors: {
          ...this.state.fieldErrors,
          address: false
        }
      }))
  };

  checkForEmptyFields = () => {
    const fields = [
      'title', 
      'address', 
      'price', 
      'description', 
      'start_date', 
      'end_date', 
      'max_guests'
    ];
    
    const fieldErrors = {}

    fields.forEach(field => {
      this.state.listing[field] ? fieldErrors[field] = false : fieldErrors[field] = true;
    })
    
    return {
      fieldErrors,
      hasErrors: Boolean(Object.values(fieldErrors).filter(bool => bool == true).length)
    }
  }

  removeError = (field) => {
    const { fieldErrors } = this.state;
    if(fieldErrors[field] && this.state.listing[field]) {
      return () => {
        fieldErrors[field] = false;
        this.setState({fieldErrors});
      }
    }
  }

  removePhoto = (id) => {
    let { photos } = this.state.listing;
    photos = photos.filter(photo => photo.id !== id)

    return () => {
      this.setState({
        listing: {
          ...this.state.listing,
          photos
        },

      })
    }
  }

  render() {
    const { 
      listingLoading,
      errors, 
      home_types,
      amenities, 
      formType
    } = this.props;

    if(listingLoading) return <Loading />;
    
    let { 
      startDate,
      endDate,
      focusedInput,
      fieldErrors,
      hasErrors,
      savingListing,
      listing: {
        title, 
        thumb_img_idx, 
        address, 
        price, 
        amenity_ids,
        home_type_id, 
        description, 
        max_guests,
        photos
      }
    } = this.state;

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

    const inputProps = {
      placeholder: 'Find your address...',
      className: `location-search-input text-input ${fieldErrors.address ? 'field-error' : null}`,
    }

    return (
      <section className="flex-container create-listing">
        <section className="content-container grid--50">
          <h2>{formType == "Edit Listing" ? "Edit your listing" : 'Lets get started listing your place.'}</h2>
          <div className="content-container--profile listing-form">
            { (!isEmpty(errors) || hasErrors) &&
                <>
                <ul className="session-errors">
                  <li>Please fix the issues below:</li>
                  {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <hr className="hr-24--no-line" />
                </>
            }
            <label>Title
              <input 
                className={`text-input ${fieldErrors.title ? 'field-error' : null}`}
                type="text" 
                placeholder="Title"
                name="title"
                value={title} 
                onChange={this.handleInput} 
                onBlur={this.removeError('title')}
                />
            </label>
            <label>
              Address  
              <PlacesAutocompleteComponent 
                address={address} 
                handleChangeAddress={this.handleChangeAddress} 
                handleSelectAddress={this.handleSelectAddress} 
                inputProps={inputProps}
                dropdownClass="autocomplete-dropdown"
              />
            </label>

            <label>Price Per Night
              <input 
                className={`text-input ${fieldErrors.price ? 'field-error' : null}`}
                type="text" 
                placeholder="Price"
                name="price"
                value={price} 
                onChange={this.onPriceChange}
                onBlur={this.removeError('price')}
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
                isMulti
                options={formattedAmenities}
                className="basic-multi-select"
                classNamePrefix="select"
                value={defaultAmentities}
                onChange={this.handleAmenities}
              />
              </div>        
            </label>
            <label>Describe your listing
            <textarea 
              className={`text-area ${fieldErrors.description ? 'field-error' : null}`}
              name="description"
              value={description} 
              onChange={this.handleInput} 
              onBlur={this.removeError('description')}
              >{description}</textarea>
            </label>
            <label>Max guests
              <input 
                className="text-input"
                type="number" 
                placeholder="Max Guests"
                name="max_guests"
                onBlur={this.removeError('max_guests')}
                value={max_guests} 
                onChange={this.handleNumGuestChange} 
              />
            </label>
            <hr className="hr-24" />
              <input 
                type="file" 
                id="file"
                onChange={e => this.setState({ selectedPhotoFiles: e.target.files })}
                multiple />
              
              <label htmlFor="file" className="upload-button">Add Photos</label>
              {!!this.state.selectedPhotoFiles.length && <p>{this.state.selectedPhotoFiles.length} files selected</p>}    
                {(photos && photos.length) ?
                  <div className="flex-container--no-justify photos-container">
                    { photos.map((photo, idx) => {
                      return (
                        <div className="listing-thumb-wrapper" key={idx}>
                          <div className="listing-thumb square-image" style={{backgroundImage: `url(${photo.url})`}} />
                          <span className="small cursor-pointer" onClick={this.removePhoto(photo.id)}>Remove</span>
                        </div>)
                      }
                    ) }
                    
                  </div> : null
                }
            <hr className="hr-24" />
            <div className="flex-container--no-justify">
              <label className="inline">
                <p>Available From:</p>
                <input 
                  type="text" 
                  name="start_date" 
                  className={`text-input ${fieldErrors.start_date ? 'field-error' : null}`}
                  value={startDateString} 
                  placeholder="mm/dd/yyyy"
                  readOnly />
              </label>
              <label>
                <p>Until:</p>
                <input
                  type="text" 
                  className={`text-input ${fieldErrors.end_date ? 'field-error' : null}`}
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
              isDayBlocked={day => this.checkBlockedDays(day)}
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
                    start_date: startDate && moment(startDate).format('YYYY-MM-DD'),
                    end_date: endDate && moment(endDate).format('YYYY-MM-DD'), 
                  }
                })  
              } 
              focusedInput={focusedInput} 
              onFocusChange={this.onFocusChange} 
            />
          </div>
          <section className="flex-container--no-justify submit-container">
            <button 
              onClick={this.handleSubmit} 
              className="button--submit inline-block grid--33 margin-right24" >
              {savingListing ? 'Saving...' : formType}
            </button>

            <button 
            className="button--cancel inline-block grid--33" 
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