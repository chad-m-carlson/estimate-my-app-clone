class AddAndRenameColumnsInEstimates < ActiveRecord::Migration[5.2]
  def change
    add_column :estimates, :design_value, :float
    add_column :estimates, :qaTesting_value, :float
    add_column :estimates, :deployment_value, :float
    add_column :estimates, :postDeploymentDev_value, :float
    add_column :estimates, :projectManagement_value, :float
    add_column :estimates, :generalBuffer_value, :float
    add_column :estimates, :total, :float
    add_column :estimates, :nonDevTotal, :float
    
    
    rename_column :estimates, :design, :design_multiplier
    rename_column :estimates, :qaTesting, :qaTesting_multiplier
    rename_column :estimates, :deployment, :deployment_multiplier
    rename_column :estimates, :postDeploymentDev, :postDeploymentDev_multiplier
    rename_column :estimates, :projectManagement, :projectManagement_multiplier
    rename_column :estimates, :generalBuffer, :generalBuffer_multiplier  

  end
end
