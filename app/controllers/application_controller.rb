class ApplicationController < ActionController::API
    include ActionController::Cookies  # for cookies

    before_action :authorize

    private
    # authorize the user
    def authorize
        render json: {errors: ["Unauthorized"]}, status: :unauthorized unless session.include? :user_id
    end
end
