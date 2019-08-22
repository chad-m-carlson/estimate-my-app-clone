class RemoveDefaultsFromCategoriesAndFeatures < ActiveRecord::Migration[5.2]
  def change
    change_column_default :categories, :is_android, nil
    change_column_default :categories, :is_ios, nil
    change_column_default :categories, :is_web, nil
    change_column_default :categories, :is_exclusive, nil
    change_column_default :features, :developer_boolean, nil
    change_column_default :features, :is_android, nil
    change_column_default :features, :is_ios, nil
    change_column_default :features, :is_web, nil
  end
end
