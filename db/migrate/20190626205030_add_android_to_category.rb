class AddAndroidToCategory < ActiveRecord::Migration[5.2]
  def change
    add_column :categories, :is_android, :boolean
    add_column :categories, :is_ios, :boolean
    add_column :categories, :is_web, :boolean
    add_column :categories, :list_location, :integer
  end
end
