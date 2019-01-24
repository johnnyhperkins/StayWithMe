# Shows an individual listing and maintains the state structure

json.listings do
  json.set! @listing.id do 
    json.partial! "api/listings/listing", listing: @listing
  end
end