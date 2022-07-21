class User < ApplicationRecord
    has_secure_password
    
    validates :username, presence: true, uniqueness: true

    has_many :hosting_events, class_name: "Event", foreign_key: "user_id", dependent: :destroy
    has_many :hosting_categories, through: :hosting_events, source: :category
    
    has_many :participations, dependent: :destroy
    has_many :attending_events, through: :participations, source: :event 

    has_many :comments, dependent: :destroy
end
