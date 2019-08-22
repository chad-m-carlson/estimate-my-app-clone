class Platform < ApplicationRecord
  has_many :categories
  has_many :features
end
