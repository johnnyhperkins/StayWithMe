class RemoveListingThumbImgColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :listings, :thumb_img, :string
    add_column :listings, :thumb_img_idx, :integer
  end
end
