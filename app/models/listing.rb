# == Schema Information
#
# Table name: listings
#
#  id            :bigint(8)        not null, primary key
#  user_id       :integer          not null
#  title         :string           not null
#  address       :text             not null
#  lat           :float            not null
#  lng           :float            not null
#  price         :integer          not null
#  home_type_id  :integer          not null
#  description   :text             not null
#  max_guests    :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  thumb_img_idx :integer
#  amenity_ids   :integer          is an Array
#

class Listing < ApplicationRecord
  validates :user_id, :title, :address, :lat, :lng, :price,:home_type_id, :description, :max_guests, presence: true

  belongs_to :user
  has_many :reviews
  has_many :listing_availabilities
  has_many_attached :photos


  def self.in_bounds(bounds)
    south_w_lat = bounds[:southWest][:lat].to_f
    north_e_lat = bounds[:northEast][:lat].to_f
    south_w_lng = bounds[:southWest][:lng].to_f
    north_e_lng = bounds[:northEast][:lng].to_f
    self.where("lat < ?", north_e_lat)
      .where("lat > ?", south_w_lat)
      .where("lng < ?", south_w_lng)
      .where("lng > ?", north_e_lng)
      
  end
end
