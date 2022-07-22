class Comment < ApplicationRecord
  validates :text, :user_id, :event_id, presence: true 
  
  belongs_to :user
  belongs_to :event

  def author
    user.username
  end
end
