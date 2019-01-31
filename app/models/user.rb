# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, :email, :session_token, :password_digest, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  after_initialize :ensure_token
  
  has_many :listings
  has_many :bookings
  has_many :reviews
  has_one_attached :photo


  attr_reader :password

  def self.find_by_credentials(username,password)
    user = User.find_by(username: username);
    return user if user && user.is_password?(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def change_password(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
    self.save
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_token
    self.session_token = SecureRandom.urlsafe_base64 unless self.session_token
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

end
