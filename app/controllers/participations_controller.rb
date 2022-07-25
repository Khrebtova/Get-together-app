class ParticipationsController < ApplicationController
  before_action :authorize

  # POST /participations
  def create
    @participation = Participation.create(participation_params)
    @event = Event.find_by(id: @participation.event_id)
     
    render json: @event, status: :created
   
  end

  # DELETE '/participations/:event_id/:user_id'
  def destroy
    @participation = Participation.find_by(event_id: params[:event_id], user_id: params[:user_id])
    @event = Event.find_by(id: @participation.event_id)
    if @participation
      @participation.destroy
      render json: @event, status: :ok
    else
      render json: { error: 'Participation not found' }, status: 404
    end
  end

  private
  
  
    # Only allow a list of trusted parameters through.
    def participation_params
      params.require(:participation).permit(:event_id, :user_id)
    end

    # authorize the user
    def authorize
      render json: {errors: ["Unauthorized"]}, status: :unauthorized unless session.include? :user_id
    end
end
