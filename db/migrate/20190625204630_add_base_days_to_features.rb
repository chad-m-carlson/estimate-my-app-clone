class AddBaseDaysToFeatures < ActiveRecord::Migration[5.2]
  def change
    add_column :features, :base_days, :integer
  end
end
