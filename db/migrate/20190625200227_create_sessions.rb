class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.string :quote_id
      t.string :application
      t.string :customer_email
      t.integer :total_price
      t.integer :application_price
      t.integer :developer_day_rate
      t.integer :designer_day_rate

      t.timestamps
    end
  end
end
