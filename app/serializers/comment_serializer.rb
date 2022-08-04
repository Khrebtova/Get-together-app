class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text , :author

  belongs_to :user
  belongs_to :event
end
