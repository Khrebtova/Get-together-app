class Api::EventsController < ApplicationController
  before_action :set_event, only: %i[ update destroy attend unattend ]
  
  # GET /events/last_five
  def last_five
    @five_events = Event.all.order(:created_at).reverse.first(5)
    render json: @five_events
  end

  # GET /events
  def index
    @events = Event.all
    render json: @events
  end

  # POST /events
  def create
    @event = Event.create(event_params)
    if @event.valid?
      render json: @event, status: :created
    else
      render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /events/event_id/attend/user_id
  def attend    
    @event.participations.create(user_id: params[:user_id])
    render json: @event, status: :created   
  end

  # delete /event_id/1/unattend/user_id
  def unattend
    participation = @event.participations.find_by(user_id: params[:user_id])
    participation.destroy
    render json: @event
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
