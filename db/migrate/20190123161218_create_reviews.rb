class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :user_id, null: false, index: true
      t.integer :listing_id, null: false, index: true
      t.integer :rating, null: false, index: true
      t.text :review_body, null: false

      t.timestamps
    end
  end
end
