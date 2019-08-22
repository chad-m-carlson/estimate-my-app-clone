class CreateFeatures < ActiveRecord::Migration[5.2]
  def change
    create_table :features do |t|
      t.string :name
      t.text :description
      t.boolean :developer_boolean
      t.string :base_days
      t.belongs_to :category, foreign_key: true

      t.timestamps
    end
  end
end
