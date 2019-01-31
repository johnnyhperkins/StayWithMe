class Removeamenitiesandhometypes < ActiveRecord::Migration[5.2]
  def change
    drop_table :amenities
    drop_table :home_types
  end
end
