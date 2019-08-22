class Feature < ApplicationRecord
  validates :name, :description, :base_days, :multiplier, presence: true

  belongs_to :category
  has_many :feature_estimates
  has_many :estimates, through: :feature_estimates
  def self.get_features_by_platform(platform_id)
    Feature.find_by_sql("
      SELECT *
      FROM features
      WHERE platform_id = #{platform_id}
    ")
  end

  def self.get_features_active
    Feature.find_by_sql("
      SELECT *
      FROM features
      WHERE is_active = true
    ")
  end

  def self.active_ios_f
    Feature.find_by_sql("
      SELECT *
      FROM features
      WHERE (is_active = true AND platform_id = 1)
      ")
  end

  def self.active_android_f
    Feature.find_by_sql("
      SELECT *
      FROM features
      WHERE (is_active = true AND platform_id = 2)
      ")
  end

  def self.active_web_f
    Feature.find_by_sql("
      SELECT *
      FROM features
      WHERE (is_active = true AND platform_id = 3)
      ")
  end
  
  def self.get_all_features
    Feature.find_by_sql("
    SELECT id, name, description, base_days, platform_id, category_id, is_active, 
    FROM features
    
    ")
  end
  
  # def self.by_ids(nums)
  #   Feature.find_by_sql(["
  #     SELECT *
  #     FROM features
  #     where id IN ?
  #   ",nums])
  # end
end