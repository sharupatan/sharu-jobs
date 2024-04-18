class UserMailer < ApplicationMailer
    def confirmation_instructions(user, otp)
        @user = user
        @otp = otp
        email = @user.email.presence || @user.unconfirmed_email
        mail(to: email, subject: 'your otp')
    end
end