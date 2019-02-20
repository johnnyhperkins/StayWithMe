# StayWithMe

StayWithMe is an AirBnB inspired site with a number of fully functional features:

#Sessions
* Secure log in and sign up with password hashing and user authentication
  
#User Profile Section
* Edit user profile picture, email, password and username (with real time checking to make sure username and email don't already exisit in the database)
* Create listings, upload photos (stored in AWS), and update or delete a user's listings
* See list of user's reviews, bookings made for other listings, bookings that have been made for user's listings, and interface to approve or deny bookings

#Search
* Search for listings on an interactive map where results are populated in real time as the map moves and can be filtered by date, number of guests, price & amenities (price and amenities coming soon!).
  
#Listings/Bookings
* Listing page allows user to request to book the listing, leave reviews (only if user has an approved booking), see others' reviews, listing description, amenities, etc.
* Photo modal
* Booking will not allow a user with a pending or approved booking to book for the same dates
* Booking will not allow the owner of a listing to book their own place
* Booking calendar shades out unavailable days and prevents users from booking them on both client and server-side
* After user searches by date and clicks on a listing, the booking form automatically fills in the calendar dates and calculates the total cost
* After booking is approved, the listing's availability calendar blocks off those dates, and the listing will no longer appear in search results for those dates