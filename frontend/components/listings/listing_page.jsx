import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import { isInclusivelyAfterDay, DayPickerRangeController } from 'react-dates';
import { withRouter, Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import Rating from 'react-rating';

import { fetchListing } from '../../actions/listings'
import { fetchListingReviews } from '../../actions/reviews'
import Loading from '../misc/loading';
import Review from '../reviews/review';
import ReviewForm from '../reviews/review_form';
import ListingSidebar from './listing_sidebar';

import { AirCon } from '../../static_assets/amenity_icons';
import ListingImageHeader from './listing_image_header';

const today = moment();

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate:null,
      endDate:null,
      focusedInput: null,
    }
  }

  checkBlockedDays = (day) => {
    const { listing } = this.props;
    const { booked_dates } = this.props.listing;
    return !!booked_dates.filter(booking => 
      moment(day).isBetween(booking.start_date, booking.end_date) && 
      booking.status == "APPROVED").length || 
      moment(day).isBefore(listing.start_date) ||
      moment(day).isAfter(listing.end_date)
  }

  componentDidMount() {
    const { 
      fetchListing,
      fetchListingReviews, 
    } = this.props;

    fetchListingReviews(this.props.match.params.id);

    fetchListing(this.props.match.params.id).then(({listing}) => {
      
      //init map
      const mapOptions = {
        center: { lat: listing.lat, lng: listing.lng },
        zoom: 16
      };
      const mapDOMNode = document.getElementById('map')
      this.map = new google.maps.Map(mapDOMNode, mapOptions);
      const blueCircle = new google.maps.Circle({
        strokeColor: 'rgb(161,207,218)',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'rgb(161,207,218)',
        fillOpacity: 0.35,
        map: this.map,
        center: mapOptions.center,
        radius: 150
      });
      blueCircle.setMap(this.map);

    }); 
  }  

  render() {
    const { 
      listingLoading, 
      amenities, 
      home_types, 
      listing,
      reviews } = this.props;
    
    if(listingLoading) {
      return <Loading />
    }
    
    const { 
      title, 
      address, 
      amenity_ids, 
      home_type_id, 
      description,
      start_date,
      end_date,
      id,
      max_guests,
      user_id,
      photos,
      rating,
      review_ids,
      ownerPhotoUrl,
      ownerName
    } = this.props.listing;

    return (
      <>{ photos ?
        <ListingImageHeader photos={photos} /> 
        :
        <div className="left-half hero-image--dummy grid--50"></div>
      }
      
      <section className="content-container--interior-page flex-container">
        <section className="listing-details-container grid--75">
          <div className="listing-details__header">
            <div>
              {Object.values(home_types).filter(ht => ht.id == home_type_id).map(ht => <h6 key={ht.id} className="text--maroon">{ht.name}</h6>)}
              <h2>{title} {this.props.userId == user_id && 
                <Link to={`/listings/${id}/edit`}>
                  (<span className="text--teal">Edit Listing</span>)
                </Link>
                }
              </h2>
              <p>{address}</p>
              <p>Max Guests: {max_guests}</p>
            </div>

            <div className="profile-thumb-wrapper">
              <div className="profile-thumb" style={{backgroundImage: `url(${ownerPhotoUrl})`}}></div>
              <p className="tiny">{ownerName}</p>
            </div>
          </div>

          <hr className="hr-24"/>
          
          <p>{description}</p>

          
          <hr className="hr-24"/>
          {/* AMENITIES */}

          <div className="amenities">
            <h5>Amenities</h5>
            <ul>
            {Object.values(amenities).filter(a => amenity_ids.includes(a.id)).map(amenity => {
              return <li key={amenity.id}>{amenity.name}</li>
            })}
            </ul>
          </div>

          <hr className="hr-24"/>
          {/* AVAILABILITY */}

          <h5>Availability</h5>
          <DayPickerRangeController
            startDate={moment(start_date)}
            endDate={moment(end_date)}
            numberOfMonths={2}
            noBorder
            isDayBlocked={day => this.checkBlockedDays(day)}
            isOutsideRange={day => isInclusivelyAfterDay(today, day)}
            onPrevMonthClick={DayPickerRangeController.onPrevMonthClick}
            onNextMonthClick={DayPickerRangeController.onNextMonthClick}
            focusedInput={null} 
            onFocusChange={focusedInput => this.setState({ focusedInput })}
          />

          <hr className="hr-24"/>
          {/* LOCATION */}
          
          <div className="map-wrapper">
            <h5>Location</h5>
            <div id="map" ref={map => this.mapNode = map}></div>
          </div>

          <hr className="hr-24--no-line"/>
          {/* REVIEWS */}

          <div className="flex-container--no-justify rating-container">
          
            { review_ids.length ? 
              <>
              <h3>{review_ids.length} Review{review_ids.length > 1 ? 's' : ''}</h3> 
              <br />
                <Rating 
                  className="read-only-rating"
                  readonly
                  emptySymbol="fa fa-star-o fa-2x"
                  fullSymbol="fa fa-star fa-2x"
                  initialRating={rating}
                />
              </>
              : 
              <h3>No reviews yet</h3>
            }
          
          </div>

          {/* <hr className="hr-24"/> */}
          {/* LEAVE REVIEWS */}
          {this.props.listing.user_id != this.props.userId ? (
          <>
          <section className="reviews-container">
            {!isEmpty(reviews) ? Object.values(reviews).map(review => <Review key={review.id} review={review} />) : null}
          </section>
          <ReviewForm listing_id={id} />
          </>
          ) :
          null

        }
        </section>
        <StickyBox offsetTop={80}>
          <ListingSidebar listing={listing} checkBlockedDays={this.checkBlockedDays} />
        </StickyBox>
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
  home_types: state.entities.home_types,
  reviews: state.entities.reviews
})

const mdp = dispatch => ({
  fetchListing: id => dispatch(fetchListing(id)),
  fetchListingReviews: (listingId) => dispatch(fetchListingReviews(listingId)),
})

export default withRouter(connect(msp,mdp)(Listing));
