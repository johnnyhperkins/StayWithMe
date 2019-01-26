Rails.application.routes.draw do
  namespace :api, defaults: {format: :json}  do
    resources :users, only: [:create, :update]
    post '/users/:user_id/listings', to: 'users#index'
    post '/users/search', to: 'users#user_exists'
    resource :session, only: [:create, :new, :destroy]
    resources :listings, only: [:create, :destroy, :show, :update, :index]
    resources :home_types, only: [:index]
    resources :amenities, only: [:index]
  end
  root to: 'static_pages#root'
end
