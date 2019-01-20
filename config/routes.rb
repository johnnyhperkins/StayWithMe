Rails.application.routes.draw do
  namespace :api, defaults: {format: :json}  do
    resources :users, only: [:create]
    post '/users/search', to: 'users#user_exists'
    resource :session, only: [:create, :new, :destroy]
  end
  root to: 'static_pages#root'
end
