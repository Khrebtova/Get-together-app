class Api::UsersController < ApplicationController
    
  # POST /signup
  def create
    user = User.create(user_params)
    if user.valid?
        session[:user_id] = user.id
        render json: user, status: :created
    else
        render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # GET /me
  def show
    user = User.find_by(id: session[:user_id])
    if user 
        render json: user, status: :ok
    else
        render json: {errors: ["Unauthorized"]}, status: :unauthorized
    end
end
  
  private
 
  # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :password, :password_confirmation)
    end
end
