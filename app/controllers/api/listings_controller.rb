# GET /api/listings - returns listings filtered by query params (e.g. location, price, dates, etc)
# GET /api/listings/:id - returns individual listing
# POST /api/listings - creates a listing
# PATCH /api/listings/:id - edit a listing
# DELETE /api/listings/:id - remove a listing
# GET /api/users/:user_id/listings - returns all listings for an individual user

class Api::ListingsController < ApplicationController
  before_action :require_logged_in, only: [:create, :destroy, ]

  def create
    @listing = Listing.new(listing_params)
    @listing.user_id = current_user.id;
    if @listing.save
      render 'api/listings/show'
    else 
      render json: @listing.errors.full_messages, status: 409
    end
  end

  def update 
    @listing = current_user.listings.find(params[:id]);
    if @listing
      if @listing.update_attributes(listing_params);
        render 'api/listings/show'
      else 
        render json: @listing.errors.full_messages, status: 409
      end
    else
      render json: ['Listing not found'], status: 409
    end
  end

  def show
    @listing = Listing.find(params[:id])
    if @listing
      render 'api/listings/show'
    else 
      render json: ['Listing not found'], status: 409
    end
  end

  def index
    # query = 
    # @listings = List
  end

  def destroy
    @listing = current_user.listings.find(params[:id]);
    if @listing
      @listing.destroy;
      render json: ["Listing #{@listing.title} has been successfully deleted"]
    else
      render json: ['This listing does not exist or you do not have permission to delete it'], status: 409
    end
  end

  private
  def listing_params
    params.require(:listing).permit(:user_id, :title, :thumb_img, :address, :lat, :lng, :price, :home_type_id, :description, :max_guests, :images)
  end
end

