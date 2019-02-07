import React, { Component } from 'react';

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

    render() { 
      return (
      <section className="filter-bar flex-container--no-justify">
        <button className="button button--inline button--outlined ">Dates</button>
        <button className="button button--inline button--outlined">Guests</button>
        <button className="button button--inline button--outlined">Amenities</button>
        <button className="button button--inline button--outlined">Price</button>
      </section>
    );
  }
}

export default SearchFilterBar;