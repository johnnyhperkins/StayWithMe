class RemoveImageColumnFromListings < ActiveRecord::Migration[5.2]
  def change
    remove_column :listings, :images
    remove_column :users, :profile_thumb
  end
end
