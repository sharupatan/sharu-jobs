class ConfirmationsController < ApplicationController
    OTP_EXPIRATION_TIME = 5.minutes.ago

    def validate_otp
        user = User.find_by_confirmation_token(permitted_params[:otp])

        if user && user.confirmation_sent_at >= OTP_EXPIRATION_TIME
            user.confirm
            user.update(confirmation_token: nil)
            # email confirmed successfully
            redirect_to '/'
        else
            # invalid or expired otp. Please try again.
            redirect_to '/'
        end
    end

    def resend_otp
        user = User.find_by(id: params[:user][:id])
        user.send_confirmation_instructions
        redirect_to '/'
    end

    private

    def permitted_params
        params.require(:user).permit(:otp)
    end
end