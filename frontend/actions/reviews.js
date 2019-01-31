import * as ApiReviewsUtil from '../util/reviews_api';
export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';

export const RECEIVE_REVIEW_ERRORS = 'RECEIVE_REVIEW_ERRORS';

//Reviews
export const createReview = review => dispatch => {
  return ApiReviewsUtil.createReview(review).then(review => {
    return dispatch(receiveReview(review));
  },
  (e) => dispatch(receiveReviewErrors(e.responseJSON)))
};


//TO DO: need to refactor later 
export const fetchListingReviews = (listingId) => dispatch => {
  return ApiReviewsUtil.fetchListingReviews(listingId).then(reviews => {
    console.log(reviews);
    return dispatch(receiveReviews(reviews));
  },
  (e) => dispatch(receiveReviewErrors(e.responseJSON)))
};

export const fetchUserReviews = userId => dispatch => {
  return ApiReviewsUtil.fetchUserReviews(userId).then(reviews => {
    return dispatch(receiveReviews(reviews));
  },
  (e) => dispatch(receiveReviewErrors(e.responseJSON)))
};

export const fetchReview = id => dispatch => {
  return ApiReviewsUtil.fetchReview(id).then(review => {
    return dispatch(receiveReview(review));
  },
  (e) => dispatch(receiveReviewErrors(e.responseJSON)))
};

export const destroyReview = (id) => dispatch => {
  return ApiReviewsUtil.destroyReview(id).then(() => {
    return dispatch(removeReview(id));
  },
  (e) => dispatch(receiveReviewErrors(e.responseJSON)))
}

const receiveReviews = ({reviews}) => ({
  type: RECEIVE_REVIEWS,
  reviews
})

const receiveReview = (review) => ({
  type: RECEIVE_REVIEW,
  review
})

const removeReview = id => ({
  type: REMOVE_REVIEW,
  id
})

export const receiveReviewErrors = (errors) => ({
  type: RECEIVE_REVIEW_ERRORS,
  errors
})