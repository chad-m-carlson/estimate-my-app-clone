class Api::FeaturesEstimatesController < ApplicationController
  before_action :set_estimate, only: [:index, :show]

  def index
    @estimate = Estimate.find(params[:estimate_id])
    render json: @estimate.features_estimates
  end

  def show
    render json: @estimate.feature_estimates
  end
  
  def create
    # FeatureEstimate.post_all_features(params[:selectedFeatures], params[:estimate_id])
    estimate = params[:estimate]
    render json: FeatureEstimate.post_all_features(params[:selectedFeatures], params[:estimate_id])
    # estimate_email(estimate)
    
  end

  def featureIDs_from_estimate
    # render json: FeatureEstimate.get_feature_IDs(params[:estimate_id])
    render json: FeatureEstimate.where(:estimate_id => params[:estimate_id]).pluck(:feature_id)
  end


  private 

  def estimate_email(estimate)
    EstimateMailer.estimate_email(estimate).deliver_now
    # render json: "Succesfully emailed"
  end

  def set_estimate
    @estimate = Estimate.find(params[:estimate_id])
  end

end
