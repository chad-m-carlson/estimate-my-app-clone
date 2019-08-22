class AddAndroidToFeature < ActiveRecord::Migration[5.2]
  def change
    add_column :features, :is_android, :boolean
    add_column :features, :is_ios, :boolean
    add_column :features, :is_web, :boolean
  end
end
