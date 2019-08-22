class Estimate < ApplicationRecord
  validates :customer_email, :customer_name, presence: true

  has_many :feature_estimates, dependent: :destroy
  has_many :features, through: :feature_estimates

end
