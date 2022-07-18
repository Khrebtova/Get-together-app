class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :location, :date
  has_one :category
  has_one :host
  has_many :guests
end
