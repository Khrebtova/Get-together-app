class Participation < ApplicationRecord
  validates :user_id, :event_id, presence: true
  
  validate :host_cannot_participate_in_own_event
  validate :guest_already_participating?

  belongs_to :guest, class_name: 'User', foreign_key: 'user_id'
  belongs_to :event
  
  def host_cannot_participate_in_own_event
    event = Event.find(event_id)
    if event.user_id == user_id
      errors.add(:user_id, "You cannot participate in your own event")
    end
  end 

  def guest_already_participating?
    event = Event.find(event_id)
    event.participations.each do |participation|
      if participation.user_id == user_id
        errors.add(:user_id, "You are already participating in this event")
      end
    end   
  end
end
