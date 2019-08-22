require 'test_helper'

class Api::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_sessions_index_url
    assert_response :success
  end

  test "should get update" do
    get api_sessions_update_url
    assert_response :success
  end

end
