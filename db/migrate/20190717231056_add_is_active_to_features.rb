class AddIsActiveToFeatures < ActiveRecord::Migration[5.2]
  def change
    add_column :features, :is_active, :boolean, default: true
  end
end
