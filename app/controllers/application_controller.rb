class ApplicationController < ActionController::Base
    def loginStatus
        render json: (current_user ? current_user : {})
    end
end
