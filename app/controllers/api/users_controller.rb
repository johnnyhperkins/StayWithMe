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
    if current_user.id == params[:user_id].to_i
      @listings = current_user.listings
    end
  end

  def update
    @user = User.find(params[:user][:id])
    # debugger
    if @user == current_user
      if !params[:user][:password].nil?
        if params.include?(:password) && params[:user][:password].length > 5
          @user.password = params[:user][:password]
        else
          return render json: ['Password must be at least 6 characters'], status: 402
        end
      end
      if @user.update_attributes(user_params)
        render json: ['Successfully updated user profile'], status: 200
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
    params.require(:user).permit(:username, :email, :password, :profile_thumb)
  end
end
