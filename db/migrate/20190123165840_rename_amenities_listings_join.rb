class RenameAmenitiesListingsJoin < ActiveRecord::Migration[5.2]
  def change
    rename_table :amenities_listings, :listing_amenities
  end
end
