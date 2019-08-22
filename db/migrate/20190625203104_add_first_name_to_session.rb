class AddFirstNameToSession < ActiveRecord::Migration[5.2]
  def change
    add_column :sessions, :first_name, :string
    add_column :sessions, :last_name, :string
    add_column :sessions, :comments, :text
  end
end
