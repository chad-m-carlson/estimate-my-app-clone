class AddPlatformRefToCategories < ActiveRecord::Migration[5.2]
  def change
    add_reference :categories, :platform, foreign_key: true
  end
end
