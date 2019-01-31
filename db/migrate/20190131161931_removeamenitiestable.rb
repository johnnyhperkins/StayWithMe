class Removeamenitiestable < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :amenity_ids, :integer, array: true
    drop_table :listing_amenities
  end
end
