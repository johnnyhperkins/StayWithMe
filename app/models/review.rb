# == Schema Information
#
# Table name: reviews
#
#  id          :bigint(8)        not null, primary key
#  user_id     :integer          not null
#  listing_id  :integer          not null
#  rating      :integer          not null
#  review_body :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Review < ApplicationRecord
  validates :user_id, :listing_id, :rating, :review_body, presence: true

  belongs_to :listing
  belongs_to :user
  
end
