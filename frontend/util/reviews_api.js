//Reviews

export const createReview = (review) => {
  return $.ajax({
    url: '/api/reviews',
    method: "POST",
    data: { review },
  })
};

export const fetchReview = (id) => {
  return $.ajax({
    url: `/api/reviews/${id}`,
    method: "GET",
  })
};

export const fetchListingReviews = (listingId) => {
  return $.ajax({
    url: `/api/listings/${listingId}/reviews`,
    method: "POST",
  })
};

export const fetchUserReviews = (id) => {
  return $.ajax({
    url: `/api/users/${id}/reviews`,
    method: "GET",
  })
};

export const destroyReview = (id) => {
  return $.ajax({
    url: `/api/reviews/${id}`,
    method: "DELETE"
  })
};

export const updateReview = (review) => {
  return $.ajax({
    url: `/api/reviews/${review.get('review[id]')}`,
    method: "PATCH",
    data: review,
  })
};