class ApplicationController < ActionController::Base
    def loginStatus
        render json: (current_user ? true : false)
    end
end
