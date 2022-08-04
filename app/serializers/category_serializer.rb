class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name
  # has_many :events
  # has_many :hosts, through: :events
end
