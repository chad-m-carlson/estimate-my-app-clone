require 'test_helper'

class Api::EstimatesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_estimates_create_url
    assert_response :success
  end

end
