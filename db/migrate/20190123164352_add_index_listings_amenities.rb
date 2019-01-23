class AddIndexListingsAmenities < ActiveRecord::Migration[5.2]
  def change
    add_index :amenities_listings, :listing_id
    add_index :amenities_listings, :amenity_id
  end
end
