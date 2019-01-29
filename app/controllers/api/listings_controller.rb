# GET /api/listings - returns listings filtered by query params (e.g. location, price, dates, etc)
# GET /api/listings/:id - returns individual listing
# POST /api/listings - creates a listing
# PATCH /api/listings/:id - edit a listing
# DELETE /api/listings/:id - remove a listing
# GET /api/users/:user_id/listings - returns all listings for an individual user

class Api::ListingsController < ApplicationController
  before_action :require_logged_in, only: [:create, :destroy]

  def create
    debugger
    @listing = Listing.new(listing_params)
    @listing.user_id = current_user.id;
    if @listing.save
      if params[:listing][:amenity_ids].length
        params[:listing][:amenity_ids].each do |amenity_id|
          @listing.listing_amenities.create(amenity_id:amenity_id)
        end
      end
      @listing.listing_availabilities.create(
        start_date: params[:listing][:start_date], 
        end_date: params[:listing][:end_date]
      )
      render 'api/listings/show'

    else 
      render json: @listing.errors.full_messages, status: 409
    end
    
  end

  def update 
    @listing = current_user.listings.find(params[:id]);
    debugger
    if @listing
      if @listing.update_attributes(listing_params);
        if params[:listing][:amenity_ids].length
          params[:listing][:amenity_ids].each do |amenity_id|
            @listing.listing_amenities.create(amenity_id:amenity_id)
          end
        end
        if params[:listing][:start_date] || params[:listing][:end_date]
          @listing.listing_availabilities.create(
            start_date: params[:listing][:start_date], 
            end_date: params[:listing][:end_date]
          )
        end
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
      # debugger
      render 'api/listings/show'
    else 
      render json: ['Listing not found'], status: 409
    end
  end

  def index
    # query = params[:lat]
    # @listings = Listings.
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
    params.require(:listing).permit(:user_id, :title, :thumb_img_idx, :address, :lat, :lng, :price, :home_type_id, :description, :max_guests, photos: [])
  end
  # def query_params
  #   params.require(:query).permit(:start_date, :end_date, :amenity_ids)
  # end
end

