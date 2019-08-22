class AddColumnToFeatureEstimates < ActiveRecord::Migration[5.2]
  def change
    add_column :feature_estimates, :design, :float
    add_column :feature_estimates, :qaTesting, :float
    add_column :feature_estimates, :deployment, :float
    add_column :feature_estimates, :postDeploymentDev, :float
    add_column :feature_estimates, :projectManagement, :float
    add_column :feature_estimates, :generalBuffer, :float
  end
end
