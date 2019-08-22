class AddCatagoryArrayToEstimates < ActiveRecord::Migration[5.2]
  def change
    add_column :estimates, :category_array, :text, array: true, default: []
    add_column :estimates, :feature_array, :text, array: true, default: []
  end
end
