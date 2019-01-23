class CreateHomeTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :home_types do |t|
      t.string :name, null: false, index: true

      t.timestamps
    end
  end
end
