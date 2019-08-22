class AddLocationToFeature < ActiveRecord::Migration[5.2]
  def change
    add_column :features, :list_location, :integer
  end
end
