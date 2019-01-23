# == Schema Information
#
# Table name: home_types
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class HomeType < ApplicationRecord
  validates :name, presence: true
end
