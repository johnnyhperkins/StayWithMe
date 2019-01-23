class CreateListings < ActiveRecord::Migration[5.2]
  def change
    create_table :listings do |t|
      t.integer :user_id, null: false, index: true
      t.string :title, null: false, index: true
      t.string :thumb_img
      t.text :address, null: false, index: true
      t.float :lat, null: false, index: true
      t.float :lng, null: false, index: true
      t.integer :price, null: false, index: true
      t.integer :home_type_id, null: false, index: true
      t.text :description, null: false, index: true
      t.integer :max_guests, null: false, index: true
      t.string :images, array: true

      t.timestamps
    end

  end
end
