Rails.application.routes.draw do
  root "tests#index"
  get "/*path" ,to: "tests#index"
end
