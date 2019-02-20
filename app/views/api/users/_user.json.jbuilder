# to do pull in list of users booking ids and listing ids

json.extract! user, :id, :username, :email, :created_at

if user.listings
  json.listing_ids user.listings.ids
end

if user.photo.attached? 
  json.photoUrl url_for(user.photo)
end

if user.reviews
  json.review_ids user.reviews.ids
end

if user.bookings
  json.booking_ids user.bookings.ids
  json.listing_booking_ids do
    json.array! user.bookings, :listing_id
  end
end