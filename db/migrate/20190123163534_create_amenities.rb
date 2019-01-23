class CreateAmenities < ActiveRecord::Migration[5.2]
  def change
    create_table :amenities do |t|
      t.string :name, null: false, index: true

      t.timestamps
    end
    create_join_table :listings, :amenities
  end
end
