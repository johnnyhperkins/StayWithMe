# POST /api/bookings - create a booking
# PATCH /api/bookings/:id - updates a booking
# PATCH /api/bookings/:id/approved - updates to approved status for a booking
# PATCH /api/bookings/:id/denied - updates to denied status for a booking
# PATCH /api/bookings/:id/pending - updates to pending status for a booking
# DELETE /api/bookings/:id - deletes a booking
# GET /api/listings/:listing_id/bookings/ - returns all bookings for a listing


# user creates a booking with a pending status
# booking dates are checked agains the listing availabilites join table
# if there's no conflict change status to 'approved' and attach the booking to the listing
# if theres a conflict change status to 'denied'


class Api::BookingsController < ApplicationController
  before_action :require_logged_in, only: [:create, :destroy, :update]

  def create
    @booking = Booking.new(booking_params)
    @booking.user_id = current_user.id;
    if @booking.save
      @booking.booking_availabilities.create(
        start_date: params[:booking][:start_date], 
        end_date: params[:booking][:end_date]
      )
      render 'api/bookings/show'

    else 
      render json: @booking.errors.full_messages, status: 409
    end
  end

  def update 
    @booking = current_user.bookings.find(params[:id]);
    if @booking
      if @booking.update_attributes(booking_params);
        if params[:booking][:amenity_ids].length
          params[:booking][:amenity_ids].each do |amenity_id|
            @booking.booking_amenities.create(amenity_id:amenity_id)
          end
        end
        if params[:booking][:start_date] || params[:booking][:end_date]
          @booking.booking_availabilities.create(
            start_date: params[:booking][:start_date], 
            end_date: params[:booking][:end_date]
          )
        end
        render 'api/bookings/show'
      else 
        render json: @booking.errors.full_messages, status: 409
      end
    else
      render json: ['Booking not found'], status: 409
    end
  end

  def show
    @booking = Booking.find(params[:id])
    if @booking
      # debugger
      render 'api/bookings/show'
    else 
      render json: ['Booking not found'], status: 409
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

    @bookings = bounds ? Booking.in_bounds(bounds) : Booking.all
    
  end

  def destroy
    @booking = current_user.bookings.find(params[:id]);
    if @booking
      @booking.destroy;
      render json: ["Booking #{@booking.title} has been successfully deleted"]
    else
      render json: ['This booking does not exist or you do not have permission to delete it'], status: 409
    end
  end

  private
  def booking_params
    params.require(:booking).permit(:user_id, :title, :thumb_img_idx, :address, :lat, :lng, :price, :home_type_id, :description, :max_guests, photos: [])
  end

  def bounds
    params[:bounds]
  end
end

