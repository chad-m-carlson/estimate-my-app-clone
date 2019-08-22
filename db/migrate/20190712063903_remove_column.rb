class RemoveColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :feature_estimates, :design, :integer
    remove_column :feature_estimates, :qaTesting, :float
    remove_column :feature_estimates, :deployment, :float
    remove_column :feature_estimates, :postDeploymentDev, :float
    remove_column :feature_estimates, :projectManagement, :float
    remove_column :feature_estimates, :generalBuffer, :float
  end
end
