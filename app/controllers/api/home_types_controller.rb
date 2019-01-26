class Api::HomeTypesController < ApplicationController
  def index
    @home_types = HomeType.all
  end
end