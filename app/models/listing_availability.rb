# == Schema Information
#
# Table name: listing_availabilities
#
#  id         :bigint(8)        not null, primary key
#  listing_id :integer          not null
#  start_date :datetime         not null
#  end_date   :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ListingAvailability < ApplicationRecord
  validates :listing_id, :start_date, :end_date, presence: true
  belongs_to :listing
end
