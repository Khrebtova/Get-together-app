class UsersController < ApplicationController
    
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
        render json: user
    else
        render json: {errors: ["Unauthorized"]}, status: :unauthorized
    end
end
  
  
  # GET /users
  def index
    users = User.all
    render json: users
  end

  # PATCH/PUT /users/1
  # def update
  #   user = set_user
  #   if user.update(user_params)
  #     render json: user
  #   else
  #     render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
  #   end
  # end

  # DELETE /users/1
  # def destroy
  #   user = set_user   
  #   if user
  #     user.destroy
  #   else
  #     render json: {errors: ['User not found']}, status: :not_found
  #   end
  # end

  private
    
    # def set_user
    #   user = User.find_by(id: params[:id])
    # end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :password, :password_confirmation)
    end
end
