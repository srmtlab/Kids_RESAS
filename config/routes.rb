Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  root 'rooms#index'
  get '/select_room', to: 'rooms#select_room'
  get '/room/:roomname', to: 'rooms#room'
  get '/login', to: 'rooms#login'
  get '/teacher_top', to: 'rooms#teacher_top'
  get '/edit_room', to: 'rooms#edit_room'
  get '/edit_graph', to: 'rooms#edit_graph'

  get '/test/:id', to: 'home#test'
end
