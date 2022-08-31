Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :users, only: [:create, :show, :index]
    resources :categories, only: [:index, :create]
    resources :events, only: [:index, :create, :update, :destroy]
    resources :comments, only: [:create, :destroy, :last_five]
    resources :participations, only: [:create, :destroy]
    
    post '/events/:id/attend/:user_id', to: 'events#attend'
    delete '/events/:id/unattend/:user_id', to: 'events#unattend' 
    get '/events/last_five', to: 'events#last_five'
    # delete '/participations/:event_id/:user_id', to: 'participations#destroy'
    get '/comments/last_five', to: 'comments#last_five'
    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
  end
  # Routing logic: fallback requests for React Router.
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
