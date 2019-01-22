class AddColumnProfileThumbUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :profile_thumb, :string
  end
end
