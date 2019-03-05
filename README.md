# StayWithMe

### [StayWithMe live](http://www.stay-with-me.xyz/#/)

StayWithMe is an AirBnB inspired site with a number of fully functional features:

## Sessions
* Secure log in and sign up with password hashing and user authentication with dynamic username and email check to see if either already exisit in the database.
  
## User Profile Section
* Edit user profile picture, email, password and username.
* Create listings, upload photos (stored in AWS), and update or delete a user's listings
* See list of user's reviews, bookings made for other listings, bookings that have been made for user's listings, and interface to approve or deny bookings

## Search
* Search for listings on an interactive map where results are populated in real time as the map moves and can be filtered by date, number of guests, price & amenities (amenities coming soon).
  
## Listings/Bookings
* Listing page allows user to request to book the listing, leave reviews (only if user has an approved booking), see others' reviews, listing description, amenities, etc.
* Photo modal
* Booking will not allow a user with a pending or approved booking to book for the same dates
* Booking will not allow the owner of a listing to book their own place
* Booking calendar shades out unavailable days and prevents users from booking them on both client and server-side
* After user searches by date and clicks on a listing, the booking form automatically fills in the calendar dates and calculates the total cost
* After booking is approved, the listing's availability calendar blocks off those dates, and the listing will no longer appear in search results for those dates

One of the more challenging aspects of the project was coming up with an efficient way to handle the booking process. Since a listing's availability was determined through a bridging table (start_date, end_date, listing_id), each time a booking was approved I had to create or update the listing's listing_availability rows...

```rb
# Inside the booking model
belongs_to :user
belongs_to :listing

def approve!
    
    # first query the listing's listing_availabities to figure out which would need to be 'split up' or modified by the approval of the booking:
    listing_availability = self.listing.listing_availabilities
      .where('start_date <= :start_date AND end_date >= :end_date',
              start_date: self.start_date, end_date: self.end_date).first
    
    #perform multiple checks to see the listing availability needed to be completely deleted, altered at the beginning or end...
    if (self.start_date == listing_availability.start_date && 
        self.end_date == listing_availability.end_date)
      return ListingAvailability.find(listing_availability.id).destroy

    elsif self.start_date == listing_availability.start_date
      listing_availability.start_date = self.end_date

    elsif self.end_date == listing_availability.end_date
      listing_availability.end_date = self.start_date
      
    # ... or if a new one had to be created
    else
      ListingAvailability.create(
        listing_id: self.listing_id,
        start_date: self.end_date,
        end_date: listing_availability.end_date)
      listing_availability.end_date = self.start_date      
    end

    listing_availability.save!
  end
  
```
 ... update the listing's availability calendar on the front-end...
 
 ```js
//  In listing_page.jsx, using and momentjs and airbnb's own (incredibly powerful) react-dates module which has an isDayBlocked property that takes a function:

checkBlockedDays = (day) => {
  const { listing, listing: { booked_dates } } = this.props;
  day = moment(day).format('YYYY-MM-DD'); 
  
  return booked_dates.filter(booking => 
    moment(day).isBetween( 
      moment(booking.start_date).subtract(1, 'd'),
      booking.end_date, null, '()') && 
    booking.status == "APPROVED").length || 
    moment(day).isBefore(moment(listing.start_date).subtract(1, 'd')) ||
    moment(day).isAfter(listing.end_date)
}
 ```
 
  .. and finally ensure that the listing would no longer appear in search results for any of those dates:

  ```rb
# Inside the listing module, used to filter the 4 different search query params available

def self.in_bounds(bounds)
    south_w_lat = bounds[:southWest][:lat].to_f
    north_e_lat = bounds[:northEast][:lat].to_f
    south_w_lng = bounds[:southWest][:lng].to_f
    north_e_lng = bounds[:northEast][:lng].to_f
    self.where("lat < ?", north_e_lat)
      .where("lat > ?", south_w_lat)
      .where("lng < ?", south_w_lng)
      .where("lng > ?", north_e_lng)
  end
  
  def self.query(query)
    bounds = query[:bounds] ? query[:bounds] : false
    start_date = query[:start_date]
    end_date = query[:end_date]
    max_guests = query[:max_guests] ? query[:max_guests].to_i : 0
    price = query[:price] ? query[:price] : 0
  
    self.in_bounds(bounds)
      .joins(:listing_availabilities)
      .where('start_date <= ?', start_date)
      .where('end_date >= ?', end_date)
      .where('max_guests >= ?', max_guests)
      .where('price >= ?', price)
  end
  ```