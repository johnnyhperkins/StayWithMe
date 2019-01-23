class CreateListingAvailabilities < ActiveRecord::Migration[5.2]
  def change
    create_table :listing_availabilities do |t|
      t.integer :listing_id, null: false, index: true
      t.datetime :start_date, null: false, index: true
      t.datetime :end_date, null: false, index: true

      t.timestamps
    end
  end
end
