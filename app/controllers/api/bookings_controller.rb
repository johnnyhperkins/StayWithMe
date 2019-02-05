# POST /api/bookings - create a booking
# PATCH /api/bookings/:id - updates a booking
# PATCH /api/bookings/:id/approved - updates to approved status for a booking
# PATCH /api/bookings/:id/denied - updates to denied status for a booking
# PATCH /api/bookings/:id/pending - updates to pending status for a booking
# DELETE /api/bookings/:id - deletes a booking
# GET /api/listings/:listing_id/bookings/ - returns all bookings for a listing

# user creates a booking with a pending status
# booking dates are checked against the listing availabilites join table
# owner of the listing sees a booking has been requested

# if there's no conflict change status to 'approved' and attach the booking to the listing
# if theres a conflict change status to 'denied'


class Api::BookingsController < ApplicationController
  before_action :require_logged_in, only: [:index, :create, :destroy, :update]

  def create
    @booking = Booking.new(booking_params)
    @booking.user_id = current_user.id;
    if @booking.save
      render 'api/bookings/show'
    else 
      render json: @booking.errors.full_messages, status: 409
    end
  end

  def update 
    @booking = current_user.bookings.find(params[:id]);
    if @booking
      if @booking.update_attributes(booking_params);
       
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
      render 'api/bookings/show'
    else 
      render json: ['Booking not found'], status: 409
    end
  end

  def index
    # debugger
    if params[:user_id] && current_user.id == params[:user_id].to_i
      # debugger
      @bookings = Booking.where(user_id: params[:user_id].to_i)
    elsif params[:listing_id]
      # debugger
      @bookings = Booking.where(listing_id: params[:listing_id].to_i)
    else
      @bookings = []
    end
    
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
    params.require(:booking).permit(:user_id, :listing_id, :guest_count, :status, :start_date, :end_date)
  end

end