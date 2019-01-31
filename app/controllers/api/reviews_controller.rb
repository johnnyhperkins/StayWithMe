class Api::ReviewsController < ApplicationController
  before_action :require_logged_in, only: [:create, :destroy]

  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id;
    @review.listing_id = params[:review][:listing_id].to_i
    # debugger
    if @review.save
      render 'api/reviews/show'
    else 
      render json: @review.errors.full_messages, status: 409
    end
  end

  # def update 
  #   @review = current_user.reviews.find(params[:id]);
  # end

  def show
    @review = Review.find(params[:id])
    if @review
      # debugger
      render 'api/reviews/show'
    else 
      render json: ['Review not found'], status: 409
    end
  end

  def index
    @reviews = Review.where(listing_id: params[:listing_id])
  end

  def destroy
  end

  private
  def review_params
    params.require(:review).permit(:rating, :review_body)
  end
end

