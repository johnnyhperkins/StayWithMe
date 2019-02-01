class Api::ReviewsController < ApplicationController
  before_action :require_logged_in, only: [:create, :destroy]

  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id;
    @review.listing_id = params[:review][:listing_id].to_i
    if @review.save
      render 'api/reviews/show'
    else 
      render json: @review.errors.full_messages, status: 409
    end
  end

  def show
    @review = Review.find(params[:id])
    if @review
      render 'api/reviews/show'
    else 
      render json: ['Review not found'], status: 409
    end
  end

  def index
    if params[:listing_id]
      @reviews = Review.where(listing_id: params[:listing_id])
    end
    if params[:user_id]
      @reviews = Review.where(user_id: params[:user_id])
    end
  end

  def destroy
  end

  private
  def review_params
    params.require(:review).permit(:rating, :review_body)
  end
end

