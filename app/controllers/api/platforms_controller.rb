class Api::PlatformsController < ApplicationController
  before_action :set_platform, only:[:update, :destroy]
  
  def index
    render json: Platform.all
  end

  def update
    if @platform.update(platform_params)
      render json: @platform
    else
      render json: @platform.errors, status:422
    end
  end

  private
  def set_platform
    @platform = Platform.find(params[:id])
  end

  def platform_params
    params.require(:platform).permit(:name)
  end
end
