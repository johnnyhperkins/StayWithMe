class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 409
    end
  end
  
  def index
    if current_user.id == params[:user_id]
      @listings = current_user.listings
    end
  end

  def user_exists
    if params[:username] && params[:email]
      userName = User.find_by(username: params[:username])
      userEmail = User.find_by(email: params[:email])
      res = {
        username: false,
        email: false
      }

      userName && res['username'] = true
      userEmail && res['email'] = true

      return render json: res 

    end
  end

  private 
  
  def user_params
    params.require(:user).permit(:username, :email, :password, :profile_thumb)
  end
end
