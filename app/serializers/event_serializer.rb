class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :location, :date, :guest_count, :category
  # has_one :category
  has_one :host
  has_many :guests

  def guest_count
    object.guests.count
  end

end
