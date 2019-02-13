import React, { Component } from 'react';
import moment from 'moment';

class SearchFilterBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        startDate: '',
        endDate: '',
        numGuests: 1,
        focusedInput: 'startDate',
        calendarFocused: null,
        openDatePicker: false,
      }
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutsideDatePicker);
      document.addEventListener('mousedown', this.handleClickOutsideGuestSelector);
    }
  
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutsideDatePicker);
      document.removeEventListener('mousedown', this.handleClickOutsideGuestSelector)
    }

    handleClickOutsideDatePicker = (event) => {
      if (this.DatePickerRef && !this.DatePickerRef.contains(event.target)) {
        this.setState({openDatePicker: false})
      }
    }
  
    setDatePickerRef = (node) => {
      this.DatePickerRef = node;
    }
  
    handleClickOutsideGuestSelector = (event) => {
      if (this.GuestSelectorRef && !this.GuestSelectorRef.contains(event.target)) {
        this.setState({openGuestSelect: false}) 
      }
    }
  
    setGuestSelectorRef = (node) => {
      this.GuestSelectorRef = node;
    }

    removeFilter = (filter) => {
      console.log('remove', filter);
    }

    render() { 

      const { start_date, end_date, max_guests, } = this.props.query;
      return (
      <section className="filter-bar flex-container--no-justify">
        <button className="button button--inline button--outlined">Dates</button>
        <button className="button button--inline button--outlined">Guests</button>
        <button className="button button--inline button--outlined">Amenities</button>
        <button className="button button--inline button--outlined">Price</button>
        <div className="filters">
          <button className="button button--inline button--outlined">
            From: {moment(start_date).format('ddd, MMM Do')} - {moment(end_date).format('ddd, MMM Do')} <span onClick={() => this.removeFilter('DATES')} className="remove-filter">&times;</span>
          </button>
          <button className="button button--inline button--outlined">
            Guests: {max_guests} <span onClick={() => this.removeFilter('MAX_GUESTS')} className="remove-filter">&times;</span></button>
        </div>
      </section>
    );
  }
}

export default SearchFilterBar;