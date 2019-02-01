json.extract! review, :id, :user_id, :listing_id, :rating, :review_body


if review.listing
  json.listing_title review.listing.title
end

if review.user.photo.attached?
  json.photoUrl url_for(review.user.photo)
end
if review.user.username
  json.username review.user.username
end