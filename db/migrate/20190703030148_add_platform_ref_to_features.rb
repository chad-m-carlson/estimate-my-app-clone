class AddPlatformRefToFeatures < ActiveRecord::Migration[5.2]
  def change
    add_reference :features, :platform, foreign_key: true
  end
end
