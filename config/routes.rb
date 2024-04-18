Rails.application.routes.draw do
  root "tests#index"

  devise_for :users, skip: [:sessions, :registrations], controllers: {
    sessions: 'users/sessions'
  }
  
  
  devise_scope :user do
    post 'users/sign_in', to: 'users/sessions#create'
    delete 'users/sign_out', to: 'users/sessions#destroy'

    post 'users', to: 'users/registrations#create'
  end

  get "/login_status", to: 'application#loginStatus'

  get "/validate", to: 'confirmations#validate_otp'
  get "/resend", to: 'confirmations#resend'

  get "/*path" ,to: "tests#index"
end
