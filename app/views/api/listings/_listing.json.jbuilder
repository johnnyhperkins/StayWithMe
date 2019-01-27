# To do: extract amenitity ids, rating, listing_availability_ids, booking_ids

# debugger
json.extract! listing, :id, :user_id, :title, :address, :lat, :lng, :price, :home_type_id, :description, :max_guests, :images, :created_at, :updated_at, :thumb_img_idx

json.photoUrls listing.photos.map { |file| url_for(file) }
json.amenities listing.listing_amenities.map { |la| la.amenity_id }