class Category < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    has_many :events
    has_many :hosts, through: :events
end
