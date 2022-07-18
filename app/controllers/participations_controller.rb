class ParticipationsController < ApplicationController
  before_action :set_participation, only: %i[ show update destroy ]

  # GET /participations
  def index
    @participations = Participation.all
    render json: @participations
  end

  # GET /participations/1
  def show
    if @participation
      render json: @participation
    else
      render json: { error: 'Participation not found' }, status: 404
    end
  end

  # POST /participations
  def create
    @participation = Participation.create(participation_params)

    if @participation.valid?
      render json: @participation, status: :created, location: @participation
    else
      render json: { errors: @participation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /participations/1
  # def update
  #   if @participation.update(participation_params)
  #     render json: @participation
  #   else
  #     render json: @participation.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /participations/1
  def destroy
    if @participation
      @participation.destroy
      head :no_content, status: :ok
    else
      render json: { error: 'Participation not found' }, status: 404
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_participation
      @participation = Participation.find_by(id: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def participation_params
      params.require(:participation).permit(:event_id, :user_id)
    end
end
