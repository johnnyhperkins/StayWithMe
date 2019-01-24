# To do: extract amenitity ids, rating, listing_availability_ids, booking_ids

json.extract! listing, :id, :user_id, :title, :thumb_img, :address, :lat, :lng, :price, :home_type_id, :description, :max_guests, :images, :created_at, :updated_at