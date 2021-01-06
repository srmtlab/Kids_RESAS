Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  
  root 'home#index'
  resources :rooms, :only => [:index, :new, :create, :show] do
    resources :graphs, :only => [:index, :new, :create]
  end

  # TODO:　卒研後，要検討！！！
  resources :teacher, :only => [:index]

end
