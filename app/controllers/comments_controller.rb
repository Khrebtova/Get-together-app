class CommentsController < ApplicationController
  before_action :set_comment, only: %i[ show update destroy ]

  # GET /comments
  # def index
  #   @comments = Comment.all
  #   render json: @comments
  # end

  # GET /comments/last_five
  def last_five
    @comments = Comment.all.last(5)
    render json: @comments
  end

  # GET /comments/1
  # def show
  #   render json: @comment
  # end

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

  # PATCH/PUT /comments/1
  # def update
  #   if @comment.update(comment_params)
  #     render json: @comment
  #   else
  #     render json: @comment.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /comments/1
  def destroy
    @event = Event.find_by(id: @comment.event_id)
    @comment.destroy
    render json: @event, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.permit(:text, :user_id, :event_id)
    end
end
