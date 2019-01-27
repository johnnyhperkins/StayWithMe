# to do pull in list of users booking ids and listing ids

json.extract! user, :id, :username, :email, :profile_thumb

json.listing_ids do
  json.array! user.listings, :id  
end