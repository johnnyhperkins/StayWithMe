import * as ApiListingsUtil from '../util/listings_api';
export const RECEIVE_LISTING = 'RECEIVE_LISTING';
export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS';
export const REMOVE_LISTING = 'REMOVE_LISTING';

export const RECEIVE_AMENITIES = 'RECEIVE_AMENITIES';
export const RECEIVE_HOME_TYPES = 'RECEIVE_HOME_TYPES';

export const RECEIVE_LISTING_ERRORS = 'RECEIVE_LISTING_ERRORS';

//Listings
export const createListing = listing => dispatch => {
  return ApiListingsUtil.createListing(listing).then(listing => {
    return dispatch(receiveListing(listing));
  },
  (e) => dispatch(receiveListingErrors(e.responseJSON)))
};

export const fetchListings = listings => dispatch => {
  return ApiListingsUtil.fetchListings(listings).then(listings => {
    return dispatch(receiveListings(listings));
  },
  (e) => dispatch(receiveListingErrors(e.responseJSON)))
};

export const fetchListing = id => dispatch => {
  return ApiListingsUtil.fetchListing(id).then(listing => {
    return dispatch(receiveListing(listing));
  },
  (e) => dispatch(receiveListingErrors(e.responseJSON)))
};

export const destroyListing = (id) => {
  return ApiListingsUtil.destroyListing(id).then(listing => {
    return dispatch(removeListing(id));
  },
  (e) => dispatch(receiveListingErrors(e.responseJSON)))
}

export const updateListing = (listing) => {
  return ApiListingsUtil.updateListing(listing).then(listing => {
    return dispatch(receiveListing(listing));
  },
  (e) => dispatch(receiveListingErrors(e.responseJSON)))
}

const receiveListings = ({listings}) => ({
  type: RECEIVE_LISTINGS,
  listings
})

const receiveListing = (listing) => ({
  type: RECEIVE_LISTING,
  listing
})

const removeListing = id => ({
  type: REMOVE_LISTING,
  id
})

// Amenities / Home Types

export const fetchAmenities = amenities => dispatch => {
  return ApiListingsUtil.fetchAmenities(amenities).then(amenities => {
    return dispatch(receiveAmenities(amenities));
  })
};

export const fetchHomeTypes = home_types => dispatch => {
  return ApiListingsUtil.fetchHomeTypes(home_types).then(home_types => {
    return dispatch(receiveHomeTypes(home_types));
  })
};


const receiveAmenities = ({amenities}) => ({
  type: RECEIVE_AMENITIES,
  amenities
})

const receiveHomeTypes = ({home_types}) => ({
  type: RECEIVE_HOME_TYPES,
  home_types
})

export const receiveListingErrors = (errors) => ({
  type: RECEIVE_LISTING_ERRORS,
  errors
})