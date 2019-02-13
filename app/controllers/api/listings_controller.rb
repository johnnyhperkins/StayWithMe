# GET /api/listings - returns listings filtered by query params (e.g. location, price, dates, etc)
# GET /api/listings/:id - returns individual listing
# POST /api/listings - creates a listing
# PATCH /api/listings/:id - edit a listing
# DELETE /api/listings/:id - remove a listing
# GET /api/users/:user_id/listings - returns all listings for an individual user

class Api::ListingsController < ApplicationController
  before_action :require_logged_in, only: [:create, :destroy, :update]

  def create
    @listing = Listing.new(listing_params)
    @listing.user_id = current_user.id;
    if @listing.save
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
    if @listing
      if @listing.update_attributes(listing_params);
        if params[:listing][:start_date] || params[:listing][:end_date]
          @listing.listing_availabilities.destroy_all
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
      render 'api/listings/show'
    else 
      render json: ['Listing not found'], status: 409
    end
  end

  def index
    default_map_bounds = {
      bounds: {
        northEast: {
          lat: 40.82386146979773,
          lng: -74.01118555112726
        },
        southWest: {
          lat: 40.74223405008065,
          lng: -73.93131204887277
        }
      }
    }
    if query_params
      bounds = params[:query][:bounds]
      start_date = params[:query][:start_date]
      end_date = params[:query][:end_date]
      max_guests = params[:query][:max_guests]
      filtered_listings = []

      if bounds
        map_listings = Listing.in_bounds(bounds)

        if start_date && end_date && !map_listings.empty?
          p '------->> start, end and listings not empty'

          map_listings.each do |listing|
            if ( listing.within_dates?(start_date, end_date) )
              # debugger
              filtered_listings << listing 
            end
          end

          return @listings = filtered_listings
        end  
      end
      p '-------->>>>> only returning map listings'
      @listings = map_listings
    end

    if sample_listings
      @listings = Listing.all.limit(sample_listings)
<<<<<<< HEAD
    elsif listings_within_dates
      @listings = Listing.within_dates(listings_within_dates)
    else bounds
      @listings = bounds ? Listing.in_bounds(bounds) : Listing.all
||||||| merged common ancestors
    else
      @listings = bounds ? Listing.in_bounds(bounds) : Listing.all
=======
>>>>>>> fixquery
    end

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
    params.require(:listing).permit(:user_id, :title, :thumb_img_idx, :address, :lat, :lng, :price, :home_type_id, :description, :max_guests, photos: [], amenity_ids: [])
  end

<<<<<<< HEAD
  def listings_within_dates
    params[:query][:dates] if params[:query]
  end

  def sample_listings
    params[:query][:sample] if params[:query]
||||||| merged common ancestors
  def sample_listings
    params[:query][:sample] if params[:query]
=======
  def query_params
    params[:query] if params[:query]
>>>>>>> fixquery
  end

  def sample_listings
    params[:query][:sample] if params[:query] && params[:query][:sample]
  end

  # def bounds
  #   params[:bounds]
  # end
end

