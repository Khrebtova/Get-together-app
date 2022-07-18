class EventsController < ApplicationController
  before_action :set_event, only: %i[ show update destroy ]

  # GET /events
  def index
    @events = Event.all
    render json: @events
  end

  # GET /events/1
  def show
    if @event
      render json: @event
    else
      render json: { error: 'Event not found' }, status: 404
    end
  end

  # POST /events
  def create
    @event = Event.create(event_params)

    if @event.valid?
      render json: @event, status: :created, location: @event
    else
      render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/1
  def update
    if @event.update(event_params)
      render json: @event
    else
      render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  def destroy
    if @event
      @event.destroy      
    else
      render json: { error: 'Event not found' }, status: 404
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find_by(id: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:name, :description, :location, :date, :category_id, :user_id, category_attributes: [ :name ])
    end
end
