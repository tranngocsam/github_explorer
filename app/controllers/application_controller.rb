class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  # If we use devise gem, then we don't need to define this method
  def current_user
    return @current_user if @current_user.present?

    if session[:uid]
      @current_user = User.from_session(session)
    end

    @current_user
  end
end
