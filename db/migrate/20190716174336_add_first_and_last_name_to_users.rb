class AddFirstAndLastNameToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    remove_column :users, :name, :string
    add_column :estimates, :employee_name, :string
  end
end
