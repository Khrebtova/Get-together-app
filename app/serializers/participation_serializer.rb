class ParticipationSerializer < ActiveModel::Serializer
  attributes :id, :event_id, :user_id
  has_one :event
  has_one :user
end
