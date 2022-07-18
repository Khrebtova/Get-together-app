class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :hosting_events
  has_many :hosting_categories
  has_many :attending_events
end
