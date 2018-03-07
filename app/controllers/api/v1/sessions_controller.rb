class Api::V1::SessionsController < Api::V1::BaseController
  def me
    respond_json_results(as_json_for_current_user)
  end
end
