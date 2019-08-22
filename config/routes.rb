Rails.application.routes.draw do
  get 'platforms/index'
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :platforms, only: [:index, :create, :update] do
      resources :categories, only: [:index, :create]
    end

    resources :categories do
      resources :features, only: [:index, :create]
    end

    # put :update_active_category
    # put :update_active_feature
    
    resources :platform, only:[:update]
    resources :category, only:[:update, :destroy]
    resources :features, only:[:update, :destroy]

    resources :sessions, only: [:show, :update]
    resources :estimates, only: [:index, :show, :create, :update]
    resources :features_estimates, only: [:index, :show, :create]

    get 'active_ios_categories', to: 'categories#active_ios_categories'
    get 'active_web_categories', to: 'categories#active_web_categories'
    get 'active_android_categories', to: 'categories#active_android_categories'
    get 'active_ios_features', to: 'features#active_ios_features'
    get 'active_web_features', to: 'features#active_web_features'
    get 'active_android_features', to: 'features#active_android_features'
    get 'all_categories', to: 'categories#all_categories'
    get 'all_active_categories', to: 'categories#all_active_categories'
    put 'update_active_category/:id', to: 'categories#update_active_category'
    get 'categories_by_id/:arr', to: 'categories#categories_by_id'
    get 'categories_by_feature_id/:arr', to: 'categories#categories_by_feature_id'
    get 'all_active_features', to: 'features#all_active_features'
    put 'update_active_feature/:id', to: 'features#update_active_feature'
    get 'all_features', to: 'features#all_features'
    get 'features_by_platform', to: 'features#features_by_platform'
    get 'featureIDs_from_estimate/:estimate_id', to: 'features_estimates#featureIDs_from_estimate'
    get 'features_by_id/:arr', to: 'features#features_by_id'
    # post 'estimate_email', to: 'estimates#estimate_email'

  end
  get '*other', to: 'static#index'

end
