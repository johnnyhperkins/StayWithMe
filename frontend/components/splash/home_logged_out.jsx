import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../nav/navbar';
import 'react-dates/initialize';
import { isInclusivelyAfterDay, DayPickerRangeController } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import SearchIcon from '../../static_assets/search_icon';

const today = moment();

class HomeLoggedOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      startDate: '',
      endDate: '',
      num_guests: 0,
      focusedInput: 'startDate',
      calendarFocused: null,
      selectedInput: 1,
      openDatePicker: false
    } 
  }

  componentDidUpdate() {
    // const {startDate, endDate } = this.state;
    // if(!!startDate && !!endDate) this.setState({openDatePicker: false})
  }
  search = () => {
    // TO DO implement search functionality
    console.log('perform search');
  }

  onFocusChange = (focusedInput) => {
    const {startDate, endDate } = this.state;
    // console.log(!!startDate && !!endDate);
    this.setState({
      focusedInput: !focusedInput ? 'startDate' : focusedInput,
    }, (prevState) => {
      console.log(prevState);
      console.log((!!startDate && !!endDate));
    });
  }
  render() {
    const { startDate, endDate } = this.state;
    const startDateString = startDate && startDate.format('ddd, MMM Do');
    const endDateString = endDate && endDate.format('ddd, MMM Do');

    return (
      <section className="home-splash-container">
        <NavBar />
        <section className="content-container">
          <h1 className="text--white">Plan your next trip</h1>
          <div className="search-container flex-container">
            <div className="search-inputs">
              <div className="search-input-wrapper">
                <label>
                  <p>City, Address, Landmark</p>
                  <input type="text" placeholder="Manhattan, NY" onChange={(e) => this.setState({'location': e.target.value})}/>
                </label>
              </div>
              <div className="date-input-wrapper">
                <div className="date-picker-table">
                  <div className="date-picker-table-cell">
                    <label>
                      <p>Check In</p>
                      <input 
                        onClick={() => this.setState({openDatePicker: !this.state.openDatePicker})} 
                        type="text" 
                        name="start date" 
                        value={startDateString} 
                        placeholder="mm/dd/yyyy"
                        readOnly />
                    </label>
                  </div>
                  <div className="date-picker-table-cell">
                    <label>
                      <p>Check Out</p>
                      <input 
                        type="text" 
                        name="end date" 
                        value={endDateString} 
                        placeholder="mm/dd/yyyy"
                        readOnly
                        onClick={() => this.setState({openDatePicker: !this.state.openDatePicker})}
                         />
                    </label>
                  </div>
                  {this.state.openDatePicker && 
                    <>
                    <DayPickerRangeController
                      startDate={this.state.startDate}
                      noBorder={true}
                      endDate={this.state.endDate}
                      isOutsideRange={day => isInclusivelyAfterDay(today, day)}
                      onOutsideClick={DayPickerRangeController.onOutsideClick} noNavButtons
                      enableOutsideDays={false}
                      numberOfMonths={2}
                      onPrevMonthClick={DayPickerRangeController.onPrevMonthClick}
                      onNextMonthClick={DayPickerRangeController.onNextMonthClick}
                      
                      onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} 
                      focusedInput={this.state.focusedInput} 
                      onFocusChange={this.onFocusChange} 
                    />
                    
                    </>
                  }
                </div>
              </div>
              <div className="guest-input-wrapper">
                <label>
                <p>Guests</p>
                <input type="number" placeholder="1 guest" value={this.state.numGuests} onChange={(e) => this.setState({numGuests: e.target.value})}/>
                </label>
              </div>
            </div>
            <div className="search-icon-wrapper">
              <SearchIcon options={{'height':'28px','width':'28px', 'fill':'#fff'}} onClick={this.search} />
            </div>
          </div>
        </section>
      </section>
    )
  }
}

const mdp = dispatch => ({
  // searchListings: (query) => dispatch(searchListings)
})


export default connect(mdp)(HomeLoggedOut);