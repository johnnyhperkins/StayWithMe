# To do: extract amenitity ids, rating, listing_availability_ids, booking_ids

json.extract! listing, :id, :user_id, :title, :address, :lat, :lng, :price, :amenity_ids, :home_type_id, :description, :max_guests, :created_at, :updated_at, :thumb_img_idx

if listing.photos.attached? 
  json.photos listing.photos.map { |file| url_for(file) }
end

if listing.listing_availabilities
  listing.listing_availabilities.each do |la| 
    json.start_date la.start_date
    json.end_date la.end_date
  end
end

if listing.user.photo.attached?
  json.ownerPhotoUrl url_for(listing.user.photo)
  json.ownerName listing.user.username
end

def get_rating(listing)
  sum = 0
  listing.reviews.each do |review|
    sum += review.rating
  end
  if sum > 0
    return (sum / listing.reviews.count).to_f
  else
    return 0
  end
end

if listing.reviews
  json.review_ids listing.reviews.ids
  json.rating get_rating(listing)
end