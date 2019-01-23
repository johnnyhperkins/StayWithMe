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

require 'test_helper'

class ListingAvailabilityTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
