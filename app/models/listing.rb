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
  has_many :reviews, dependent: :destroy
  has_many :listing_availabilities, dependent: :destroy
  has_many :bookings, dependent: :destroy
  has_many_attached :photos, dependent: :destroy

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
  
  def self.query(query)
    bounds = query[:bounds] ? query[:bounds] : false
    start_date = query[:start_date]
    end_date = query[:end_date]
    max_guests = query[:max_guests] ? query[:max_guests].to_i : 0
    price = query[:price] && query[:price].to_i > 0 ? query[:price].to_i : 10000
  
    if bounds
      self.in_bounds(bounds)
        .joins(:listing_availabilities)
        .where('start_date <= ?', start_date)
        .where('end_date >= ?', end_date)
        .where('max_guests >= ?', max_guests)
        .where('price <= ?', price)
        
    else
      self.joins(:listing_availabilities)
        .where('start_date <= ?', start_date)
        .where('end_date >= ?', end_date)
        .where('max_guests >= ?', max_guests)
        .where('price <= ?', price)
    end
  end

  def get_availability_range
    date_range = {start_date: Date.today, end_date: Date.tomorrow}
    return date_range if self.listing_availabilities.empty?
    sorted_listing_availabilities = self.listing_availabilities.order(:start_date)
    date_range[:start_date] = sorted_listing_availabilities.first.start_date
    date_range[:end_date] = sorted_listing_availabilities.last.end_date
    date_range
  end
end
