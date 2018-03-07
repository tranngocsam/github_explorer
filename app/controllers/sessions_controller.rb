class SessionsController < ApplicationController
  def create
    omniauth = request.env['omniauth.auth']
    user = User.from_omniauth(omniauth)

    if user.valid?
      # In this sample app, we temporarily store some current user's info in session.
      # With real app we can use devise instead.
      session[:name] = user.name
      session[:uid] = user.uid
      session[:nickname] = user.nickname
    else
      flash[:error] = "Fail to login"
    end

    redirect_to root_path
  end

  def destroy
    reset_session

    redirect_to root_path
  end
end
