Rails.application.routes.draw do
  resources :comments, only: [:create, :destroy, :last_five]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :participations, only: [:create]
  resources :events
  resources :users, only: [:create, :show, :index]
  resources :categories, only: [:index, :show, :create]
  
  post '/events/:id/attend/:user_id', to: 'events#attend'
  delete '/events/:id/unattend/:user_id', to: 'events#unattend'

  delete '/participations/:event_id/:user_id', to: 'participations#destroy'

  get '/comments/last_five', to: 'comments#last_five'

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Routing logic: fallback requests for React Router.
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
