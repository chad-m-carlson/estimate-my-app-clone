require 'test_helper'

class PlatformsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get platforms_index_url
    assert_response :success
  end

end
