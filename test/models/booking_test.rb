# == Schema Information
#
# Table name: bookings
#
#  id          :bigint(8)        not null, primary key
#  user_id     :integer          not null
#  listing_id  :integer          not null
#  guest_count :integer          not null
#  status      :string           default("PENDING"), not null
#  start_date  :datetime         not null
#  end_date    :datetime         not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class BookingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
