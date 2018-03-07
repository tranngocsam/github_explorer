Rails.application.routes.draw do
  root to: "home#index"
  get "/auth/:provider/callback" => "sessions#create"
  get "/signout" => "sessions#destroy", :as => :signout

  namespace :api do
    namespace :v1 do
      resources :sessions, only: [] do
        collection do
          get :me
        end
      end
    end
  end

  get "*all", to: "home#index"
end
