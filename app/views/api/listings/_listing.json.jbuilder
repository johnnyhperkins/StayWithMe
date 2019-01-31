# To do: extract amenitity ids, rating, listing_availability_ids, booking_ids

# debugger
json.extract! listing, :id, :user_id, :title, :address, :lat, :lng, :price, :home_type_id, :description, :max_guests, :created_at, :updated_at, :thumb_img_idx

if listing.photos.attached? 
  json.photos listing.photos.map { |file| url_for(file) }
end
if listing.listing_amenities
  json.amenity_ids listing.listing_amenities.map { |la| la.amenity_id }
end
if listing.listing_availabilities
  listing.listing_availabilities.each do |la| 
    json.start_date la.start_date
    json.end_date la.end_date
  end
end

if listing.reviews
  json.review_ids listing.reviews.ids
end