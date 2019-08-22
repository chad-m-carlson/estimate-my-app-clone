class CreateFeatureEstimates < ActiveRecord::Migration[5.2]
  def change
    create_table :feature_estimates do |t|
      t.belongs_to :feature, foreign_key: true
      t.belongs_to :estimate, foreign_key: true

      t.timestamps
    end
  end
end
