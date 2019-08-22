class AddExclusivityToCategory < ActiveRecord::Migration[5.2]
  def change
    add_column :categories, :is_exclusive, :boolean
  end
end
