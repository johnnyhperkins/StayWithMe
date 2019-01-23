class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
      t.integer :user_id, null: false, index: true
      t.integer :listing_id, null: false, index: true
      t.integer :guest_count, null: false
      t.string :status, null: false, index: true, default: "PENDING"
      t.datetime :start_date, null: false, index: true
      t.datetime :end_date, null: false, index: true

      t.timestamps
    end
  end
end
