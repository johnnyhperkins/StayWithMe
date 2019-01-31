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

require 'test_helper'

class ListingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
