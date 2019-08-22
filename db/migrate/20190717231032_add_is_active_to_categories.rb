class AddIsActiveToCategories < ActiveRecord::Migration[5.2]
  def change
    add_column :categories, :is_active, :boolean, default: true
  end
end
