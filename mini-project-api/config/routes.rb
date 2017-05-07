Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :articles, only: [:index, :create]
      resources :categories, only: [:index]
    end
  end


  get '/api/v1/articles/rand', to: 'api/v1/articles#random', as: :random_article
  get '/api/v1/articles/:id', to: 'api/v1/articles#show', as: :show_article
end
