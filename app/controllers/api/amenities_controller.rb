class Api::AmenitiesController < ApplicationController
  def index
    @amenities = Amenity.all
  end
end

