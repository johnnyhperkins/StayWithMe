import * as ApiListingsUtil from '../util/listings_api';
export const RECEIVE_LISTING = 'RECEIVE_LISTING';
export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS';
export const REMOVE_LISTING = 'REMOVE_LISTING';

import { savingListing, fetchingListing } from './ui'

export const RECEIVE_LISTING_ERRORS = 'RECEIVE_LISTING_ERRORS';

//Listings
export const createListing = listing => dispatch => {
  dispatch(savingListing());
  return ApiListingsUtil.createListing(listing).then(listing => {
    return dispatch(receiveListing(listing));
  },
  (e) => dispatch(receiveListingErrors(e.responseJSON)))
};

export const queryListings = query => dispatch => {
  return ApiListingsUtil.queryListings(query).then(listings => {
    return dispatch(receiveListings(listings));
  },
  (e) => dispatch(receiveListingErrors(e.responseJSON)))
};

export const fetchUserListings = id => dispatch => {
  return ApiListingsUtil.fetchUserListings(id).then(listings => {
    return dispatch(receiveListings(listings));
  },
  (e) => dispatch(receiveListingErrors(e.responseJSON)))
};

export const fetchListing = id => dispatch => {
  dispatch(fetchingListing());
  return ApiListingsUtil.fetchListing(id).then(listing => {
    return dispatch(receiveListing(listing));
  },
  (e) => dispatch(receiveListingErrors(e.responseJSON)))
};

export const destroyListing = (id) => dispatch => {
  return ApiListingsUtil.destroyListing(id).then(() => {
    return dispatch(removeListing(id));
  },
  (e) => dispatch(receiveListingErrors(e.responseJSON)))
}

export const updateListing = (listing) => dispatch => {
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

export const receiveListingErrors = (errors) => ({
  type: RECEIVE_LISTING_ERRORS,
  errors
})