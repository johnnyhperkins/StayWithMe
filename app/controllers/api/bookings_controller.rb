class Api::BookingsController < ApplicationController
  before_action :require_logged_in, only: [:index, :create, :destroy, :update]

  def listing_available?(listing_id, start_date, end_date)
    listing_availability = ListingAvailability.find_by(listing_id: listing_id)
    listing_availability.start_date < start_date && listing_availability.end_date > end_date
  end

  def valid_booking?(booking)
    listing_available?(booking.listing_id, booking.start_date, booking.end_date) &&
    booking.guest_count <= booking.listing.max_guests &&

    # check if a request from user for same dates/listing doesn't already exisit
    Booking.where(user_id: booking.user_id)
           .where(listing_id: booking.listing_id)
           .where.not('start_date > :end_date OR end_date < :start_date', 
            start_date: booking.start_date, end_date: booking.end_date).empty?
  end
  
  def update_status
    @booking = current_user.listings.find(params[:listing_id]).bookings.find(params[:booking_id])
    if @booking
      @booking.status = params[:status]
      @booking.save
      render 'api/bookings/show'
    else
      render json: ['You don\'t have permission to update this booking'], status: 409
    end
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.user_id = current_user.id;
    if @booking.start_date && @booking.end_date
      if valid_booking?(@booking)
        if @booking.save
          render 'api/bookings/show'
        else 
          render json: @booking.errors.full_messages, status: 409
        end
      else
        render json: ['Dates are unavailable'], status: 409
      end
    else
      render json: ['Please select dates'], status: 409
    end
  end

  def update 
    # if the owner of the listing is approving
    @booking = current_user.listings.find(params[:booking][:listing_id]).bookings.find(params[:id])
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
    if params[:user_id] && current_user.id == params[:user_id].to_i
      @bookings = Booking.where(user_id: params[:user_id].to_i)
    elsif params[:listing_id]
      @bookings = Booking.where(listing_id: params[:listing_id].to_i)
    elsif params[:ids]
      # debugger
      ids = params[:ids].map(&:to_i)
      @bookings = Booking.where(id: ids)
    else
      @bookings = []
    end
    
  end

  def destroy
    booking = current_user.bookings.find(params[:id]);
    if booking
      booking.destroy;
      render json: ["Booking #{booking.listing.title} has been successfully deleted"]
    else
      render json: ['This booking does not exist or you do not have permission to delete it'], status: 409
    end
  end

  private
  def booking_params
    params.require(:booking).permit(:user_id, :listing_id, :guest_count, :status, :start_date, :end_date)
  end

end