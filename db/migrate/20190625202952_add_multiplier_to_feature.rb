class AddMultiplierToFeature < ActiveRecord::Migration[5.2]
  def change
    add_column :features, :multiplier, :integer
  end
end
