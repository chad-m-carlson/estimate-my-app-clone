class AddDefaultValueToCategoriesAndFeaturesTables < ActiveRecord::Migration[5.2]
  def change
    change_column_default :categories, :is_android, false
    change_column_default :categories, :is_ios, false
    change_column_default :categories, :is_web, true
    change_column_default :categories, :is_exclusive, false
    change_column_default :features, :developer_boolean, false
    change_column_default :features, :is_android, false
    change_column_default :features, :is_ios, false
    change_column_default :features, :is_web, true
  end
end
