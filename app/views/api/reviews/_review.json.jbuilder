json.extract! review, :id, :user_id, :listing_id, :rating, :review_body
json.listing_title review.listing.title
json.photoUrl url_for(review.user.photo)
json.username review.user.username