# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails dbseed command (or created alongside the database with dbsetup).
#
# Examples
#
#   movies = Movie.create([{ name 'Star Wars' }, { name 'Lord of the Rings' }])
#   Character.create(name 'Luke', movie movies.first)
# s3 path https://s3.us-east-2.amazonaws.com/stay-with-me/

HomeType.destroy_all
Listing.destroy_all

home_type = HomeType.create(name: 'Apartment')


listing = Listing.create!(user_id: 1, title: "My House", thumb_img: "https://s3.us-east-2.amazonaws.com/stay-with-me/homes-thumb.jpg", address: "102 Devoe St. Floor 2, Brooklyn NY 11211", lat: 40.713362, lng:-73.947158, price: 15000, home_type_id: home_type.id, description: "Testing Listing description", max_guests: 3, images: [])

listing2 = Listing.create!(user_id: 1, title: "App Academy", thumb_img: "https://s3.us-east-2.amazonaws.com/stay-with-me/homes-thumb.jpg", address: "22 east 38th st, New York", lat: 40.749956, lng:-73.980946, price: 35000, home_type_id: home_type.id, description: "App Academy description", max_guests: 3, images: [])

listing3 = Listing.create!(user_id: 1, title: "JFK Airport", thumb_img: "https://s3.us-east-2.amazonaws.com/stay-with-me/homes-thumb.jpg", address: "Airport", lat: 40.641312, lng:-73.778137, price: 25000, home_type_id: home_type.id, description: "JFK Airport description", max_guests: 3, images: [])



