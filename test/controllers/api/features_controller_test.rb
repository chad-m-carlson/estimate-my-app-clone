require 'test_helper'

class Api::FeaturesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_features_index_url
    assert_response :success
  end

  test "should get update" do
    get api_features_update_url
    assert_response :success
  end

end
