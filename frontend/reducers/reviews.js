import { RECEIVE_REVIEW, RECEIVE_REVIEWS, RECEIVE_REVIEW_ERRORS } from '../actions/reviews';
import { merge } from 'lodash'

export const reviews = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return action.reviews || {}
    case RECEIVE_REVIEW:
      return merge({}, state, {
        [action.review.id]: action.review
      })
    default:
      return state;
  }
}

export default reviews;