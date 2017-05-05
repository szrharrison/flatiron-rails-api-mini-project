Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resource :articles, only: [:index, :create]

    end
  end


  get '/api/v1/articles/:id', to: 'api/v1/articles#show', as: :show_article
end
