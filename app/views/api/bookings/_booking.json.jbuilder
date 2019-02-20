json.extract! booking, :id, :listing_id, :user_id, :status, :guest_count, :start_date, :end_date

json.listing_title booking.listing.title

json.bookerName booking.user.username

if booking.listing.photos.attached?
  json.listingPhotosUrls booking.listing.photos.map { |file| url_for(file) }
end

if booking.user.photo.attached?
  json.bookerPhotoUrl url_for(booking.user.photo)
end

json.listingPrice booking.listing.price