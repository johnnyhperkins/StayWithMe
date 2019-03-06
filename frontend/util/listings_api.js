//Listings

export const createListing = (listing) => {
  return $.ajax({
    url: '/api/listings',
    method: "POST",
    data: listing,
    contentType: false,
    processData: false,
  })
};

export const fetchListing = (id) => {
  return $.ajax({
    url: `/api/listings/${id}`,
    method: "GET",
  })
};

export const queryListings = (query) => {
  return $.ajax({
    url: '/api/listings',
    method: "GET",
    data: {query},
  })
};

export const fetchUserListings = (id) => {
  return $.ajax({
    url: `/api/users/${id}/listings`,
    method: "POST",
  })
};

export const destroyListing = (id) => {
  return $.ajax({
    url: `/api/listings/${id}`,
    method: "DELETE"
  })
};

export const updateListing = (listing) => {
  return $.ajax({
    url: `/api/listings/${listing.get('listing[id]')}`,
    method: "PATCH",
    data: listing,
    contentType: false,
    processData: false,
  })
};
