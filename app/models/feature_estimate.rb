class FeatureEstimate < ApplicationRecord
  validates :feature_id, uniqueness: {scope: :estimate_id}

  belongs_to :feature
  belongs_to :estimate, optional: true

  def self.post_all_features(feature_id, estimate_id)
    feature_id.each do |id|
      Feature.find_by_sql(["
        INSERT INTO feature_estimates (feature_id, estimate_id, created_at, updated_at)
        VALUES (:feature_id, :estimate_id, :created_at, :updated_at)",
      {feature_id: id,
      estimate_id: estimate_id,
      created_at: DateTime.now,
      updated_at: DateTime.now
      }])
    end
  end

  def self.get_feature_IDs(estimate_id)
    FeatureEstimate.find_by_sql(["
      SELECT feature_id
      FROM feature_estimates
      where estimate_id=(:estimate_id)",
      {estimate_id: estimate_id}])
  end 


end