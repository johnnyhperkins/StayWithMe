# to do pull in list of users booking ids and listing ids

json.extract! user, :id, :username, :email, :created_at

if user.listings
  json.listing_ids do
    json.array! user.listings, :id  
  end
end

if user.photo.attached? 
  json.photoUrl url_for(user.photo)
end

if user.reviews
  json.review_ids do
    json.array! user.reviews, :id
  end
end