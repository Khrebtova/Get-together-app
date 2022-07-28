class CommentsController < ApplicationController
  before_action :authorize
  before_action :set_comment, only: %i[ destroy ]

  # GET /comments/last_five
  def last_five
    @comments = Comment.all.order(:created_at).reverse.first(5)
    render json: @comments
  end
 
  # POST /comments
  def create
    @comment = Comment.create(comment_params)
    if @comment.valid?
      @event = Event.find_by(id: @comment.event_id)
      render json: @event, status: :created
    else
      render json: {errors: @comment.errors.full_messages}, status: :unprocessable_entity
    end
  end
  
  # DELETE /comments/1
  def destroy
    @event = Event.find_by(id: @comment.event_id)
    @comment.destroy
    render json: @event, status: :ok
  end

  private
    
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.permit(:text, :user_id, :event_id)
    end

    # authorize the user
    def authorize
      render json: {errors: ["Unauthorized"]}, status: :unauthorized unless session.include? :user_id
    end
end
