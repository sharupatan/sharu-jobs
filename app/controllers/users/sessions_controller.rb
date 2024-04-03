# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    email, password = JSON.parse(request.body.read).values_at('email', 'password')
    user = User.find_by(email: email)

    if user && user.valid_password?(password)
      sign_in user
      respond_with user
    else
      render json: {message: 'Unauthorised!'}
    end
  end

  # DELETE /resource/sign_out
  def destroy
    currentUserstatus = current_user
    debugger
    if currentUserstatus
      super do
        render json: {
          status: 200,
          message: 'Logged out successfully.'
        }
      end
    else
      super do
        render json: {
          status: 401,
          message: "Couldn't find an active session."
        }
      end
    end
  end

  private

  def respond_with(resource, _opts={})
    render json: {
      status: {code: 200, message: 'Logged in successfully.'},
      data: resource
    }
  end

  def respond_to_on_destroy
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
