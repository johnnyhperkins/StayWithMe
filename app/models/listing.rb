# == Schema Information
#
# Table name: listings
#
#  id           :bigint(8)        not null, primary key
#  user_id      :integer          not null
#  title        :string           not null
#  thumb_img    :string
#  address      :text             not null
#  lat          :float            not null
#  lng          :float            not null
#  price        :integer          not null
#  home_type_id :integer          not null
#  description  :text             not null
#  max_guests   :integer          not null
#  images       :string           is an Array
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Listing < ApplicationRecord
  validates :user_id, :title, :address, :lat, :lng, :price,:home_type_id, :description, :max_guests, presence: true

  belongs_to :user
  has_one :home_type
  has_many :reviews
  has_many :listing_availabilities
  has_many :listing_amenities
  has_many_attached :photos

end
