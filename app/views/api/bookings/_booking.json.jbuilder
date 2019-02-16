json.extract! booking, :id, :listing_id, :user_id, :status, :guest_count, :start_date, :end_date

json.listing_title booking.listing.title

json.bookerName booking.user.username

if booking.user.photo.attached?
  json.bookerPhotoUrl url_for(booking.user.photo)
end

