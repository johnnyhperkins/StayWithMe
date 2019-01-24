import * as ApiListingsUtil from '../util/listings_api';
export const RECEIVE_LISTING = 'RECEIVE_LISTING';
export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS';
export const REMOVE_LISTING = 'REMOVE_LISTING';


export const create = listing => dispatch => {
  return ApiListingsUtil.create(listing).then(listing => {
    return dispatch(receiveListing(listing));
  })
};

export const fetchListings = listings => dispatch => {
  return ApiListingsUtil.fetchListings(listings).then(listings => {
    return dispatch(receiveListings(listings));
  })
};

export const fetchListing = id => dispatch => {
  return ApiListingsUtil.fetchListing(id).then(listing => {
    return dispatch(receiveListing(listing));
  })
};

export const destroy = (id) => {
  return ApiListingsUtil.destroy(id).then(listing => {
    return dispatch(removeListing(id));
  })
}

export const update = (listing) => {
  return ApiListingsUtil.update(listing).then(listing => {
    return dispatch(receiveListing(listing));
  })
}

const receiveListing = listing => ({
  type: RECEIVE_LISTING,
  listing
})

const receiveListings = listings => ({
  type: RECEIVE_LISTINGS,
  listings
})

const removeListing = id => ({
  type: REMOVE_LISTING,
  id
})