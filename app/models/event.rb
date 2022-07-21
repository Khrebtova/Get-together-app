class Event < ApplicationRecord
  validates :name, :description, :location, :date, :user_id,  presence: true
  
  belongs_to :category
  belongs_to :host , class_name: 'User', foreign_key: 'user_id'

  has_many :participations, dependent: :destroy
  has_many :guests, through: :participations

  has_many :comments, dependent: :destroy
  
  accepts_nested_attributes_for :category
  # accepts_nested_attributes_for :participations
end
