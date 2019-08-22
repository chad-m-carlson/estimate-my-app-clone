class CreateEstimates < ActiveRecord::Migration[5.2]
  def change
    create_table :estimates do |t|
      t.string :customer_name
      t.string :customer_email
      t.integer :developer_day_rate
      t.integer :designer_day_rate

      t.timestamps
    end
  end
end
