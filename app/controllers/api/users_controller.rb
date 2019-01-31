class Api::UsersController < ApplicationController
  before_action :require_logged_in, only: [:index, :update]

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
    if current_user.id == params[:user_id].to_i
      @listings = current_user.listings
    end
  end

  def update
    @user = User.find(params[:user][:id])
    debugger
    if @user.id == current_user.id
      if params[:user][:password]
        debugger
        unless params[:user][:password].length > 5 && @user.change_password(params[:user][:password])
          debugger
          return render json: ['Password must be at least 6 characters'], status: 402
        end
      end
      if @user.update_attributes(update_user_params)
        render :show, status: 200
      else
        render json: @user.errors.full_messages, status: 409
      end
    else
      render json: ['You do not have permission to update this user'], status: 409
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
    params.require(:user).permit(:username, :email, :password, :photo)
  end

  def update_user_params
    params.require(:user).permit(:username, :email, :photo)
  end
end
