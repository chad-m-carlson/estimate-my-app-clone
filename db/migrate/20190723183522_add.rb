class Add < ActiveRecord::Migration[5.2]
  def change
    add_column :estimates, :coreDevTime, :float
  end
end
