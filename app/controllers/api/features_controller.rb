class Api::FeaturesController < ApplicationController
  before_action :set_category, only: [:index, :create,]
  before_action :set_feature, only: [:update, :destroy]
    def index
      render json: @category.features
    end
    
    # def features_by_platform
    #   render json: Feature.get_features_by_platform(params[:platform_id])
    # end
    def all_features
      render json: Feature.all
      # render json: Feature.get_all_features
    end

    def all_active_features
      render json: Feature.get_features_active
    end

    def update_active_feature
      @feature = Feature.find(params[:id])
      if @feature.update(is_active: false)
        render json: @feature
      else
        render json: @feature.errors, status:422
      end
    end

    def active_ios_features
      render json: Feature.active_ios_f
    end

    def active_web_features
      render json: Feature.active_web_f
    end

    def active_android_features
      render json: Feature.active_android_f
    end

    def features_by_id
      render json: Feature.where(:id => (params[:arr].scan(/\d+/).map(&:to_s)))
    end

    def create
      feature = @category.features.new(feature_params)
      if feature.save
        render json: feature
      else
        render json: feature.errors, status:422
      end
    end

    def show
    end

    def update
      if @feature.update(feature_params)
        render json: @feature
      else
        render json: @feature.errors, status:422
      end
    end

    def destroy
      @feature.delete
    end

    private
    def set_feature
      @feature = Feature.find(params[:id])
    end

    def set_category
      @category = Category.find(params[:category_id])
    end

    def feature_params
      params.require(:feature).permit(:name, :description, :base_days, :multiplier, :category_id)
    end
    
  end