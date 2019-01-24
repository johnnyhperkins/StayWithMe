export const create = (listing) => {
  return $.ajax({
    url: '/api/listings',
    method: "POST",
    data: { listing }
  })
};

export const fetchListing = (id) => {
  return $.ajax({
    url: `/api/listings/${id}`,
    method: "GET",
  })
};

export const fetchListings = (query) => {
  return $.ajax({
    url: '/api/listings/',
    method: "GET",
    data: query
  })
};

export const destroy = (id) => {
  return $.ajax({
    url: `/api/listings/${id}`,
    method: "DELETE"
  })
};

export const update = (listing) => {
  return $.ajax({
    url: `/api/listings/${listing.id}`,
    method: "PATCH",
    data: { listing }
  })
};

