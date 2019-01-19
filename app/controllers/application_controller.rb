class ApplicationController < ActionController::Base
  helper_methods :logged_in?, :current_user

  def logged_in?
    !!current_user
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def login(user)
    session[:session_token] = user.reset_token!
    @current_user = user
  end

  def logout
    user.reset_token!
    session[:session_token] = nil
  end
end
