class RemoveBaseDaysFromFeatures < ActiveRecord::Migration[5.2]
  def change
    remove_column :features, :base_days
  end
end
