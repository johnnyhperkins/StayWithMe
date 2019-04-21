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
        if params[:listing][:photos_to_delete]
          ids = params[:listing][:photos_to_delete].map(&:to_i)
          @listing.photos.where(id: ids).purge
        end
        # TO DO: fix ability for user to edit listing availability without overwriting bookings
        if params[:listing][:start_date] || params[:listing][:end_date]
          @listing.listing_availabilities.destroy_all if @listing.listing_availabilities
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
    return @listings = Listing.all.limit(sample_listings) if sample_listings
    # debugger
    @listings = Listing.query(query_params)
    if @listings
      return @listings
    else
      render json: ['No results returned']
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

  def query_params
    params[:query] if params[:query]
  end

  def sample_listings
    params[:query][:sample] if params[:query] && params[:query][:sample]
  end

end