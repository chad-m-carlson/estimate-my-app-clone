class AddColumnToFeatures < ActiveRecord::Migration[5.2]
  def change
    add_column :features, :image_url, :string
  end
end
