class AddColumnToEstimates < ActiveRecord::Migration[5.2]
  def change
    add_column :estimates, :design, :float
    add_column :estimates, :qaTesting, :float
    add_column :estimates, :deployment, :float
    add_column :estimates, :postDeploymentDev, :float
    add_column :estimates, :projectManagement, :float
    add_column :estimates, :generalBuffer, :float  
  end
end
