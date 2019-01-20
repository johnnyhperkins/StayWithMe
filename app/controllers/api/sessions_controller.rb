class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      login(@user)
      render 'api/users/show'
    else 
      render json: ['Your credentials are invalid'], status: 409
    end
  end

  def destroy
    if logged_in?
      logout
      render json: {}
    else
      render json: ['User is not logged in'], status: 409
    end
  end
end
