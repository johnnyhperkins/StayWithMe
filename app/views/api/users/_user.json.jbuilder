# to do pull in list of users booking ids and listing ids

json.extract! user, :id, :username, :email

json.listing_ids do
  json.array! user.listings, :id  
end

if user.photo.attached? 
  json.photoUrl url_for(user.photo)
end