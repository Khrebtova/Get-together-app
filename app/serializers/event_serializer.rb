class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :location, :date
  
  belongs_to :category
  belongs_to :host
  has_many :guests  
  has_many :comments

end
