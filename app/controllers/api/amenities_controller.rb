class Api::AmenitiesController < ApplicationController
  def index
    @amenities = Amenity.all
    @home_types = HomeType.all
  end
end

