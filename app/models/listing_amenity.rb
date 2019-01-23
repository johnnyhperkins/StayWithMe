# == Schema Information
#
# Table name: listing_amenities
#
#  listing_id :bigint(8)        not null
#  amenity_id :bigint(8)        not null
#

class ListingAmenity < ApplicationRecord
  validates :listing_id, :amenity_id, presence: true
  belongs_to :amenity
  belongs_to :listing
end
