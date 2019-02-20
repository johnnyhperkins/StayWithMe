import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-dates/initialize';

import { isInclusivelyAfterDay, DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import _ from 'lodash';

const today = moment();

class SearchFilterBar extends Component {
  constructor(props) {
    super(props);
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
      this.props.handleOpenDatePicker();
    }
  }

  setDatePickerRef = (node) => {
    this.DatePickerRef = node;
  }
  
  handleClickOutsideGuestSelector = (event) => {
      if (this.GuestSelectorRef && !this.GuestSelectorRef.contains(event.target)) {
        this.props.handleOpenGuestSelect();
      }
  }
  
  setGuestSelectorRef = (node) => {
    this.GuestSelectorRef = node;
  }

  renderFilters = () => {
    // const { start_date, end_date, max_guests } = this.props;
    //TO DO: get array of filters and conditionally render them
  }

  applyFilterClasses = (field) => {
    switch (field) {
      case "NUM_GUESTS":
        return this.props.numGuests > 0 ? 'button button--inline button--outlined filter-active' : 'button button--inline button--outlined'  
      case "DATES":
        return (this.props.startDate && this.props.endDate) ? 'button button--inline button--outlined filter-active' : 'button button--inline button--outlined'
      default:
        break;
    } 
  }

  removeFilter = (filter) => {
    // console.log('remove', filter);
  }

  render() { 

    const { 
      search,
      numGuests,
      openGuestSelect,
      openDatePicker,
      handleNumGuestChange,
      handleOpenGuestSelect,
      handleOpenDatePicker,
      onDatesChange,
      onFocusChange,
      focusedInput,
      startDate,
      endDate
    } = this.props;

    return (
      <section className="filter-bar flex-container--no-justify">
        <button 
          className={this.applyFilterClasses("DATES")}
          onClick={handleOpenDatePicker}>
          {startDate ? ( 
            endDate ? 
              `${moment(startDate).format('MMM DD')} - ${moment(endDate).format('MMM DD')}` : moment(startDate).format('MMM DD')
              ) : 'Dates'
          }
        </button>

        { openDatePicker && 
        <div className="range-controller-wrapper" ref={this.setDatePickerRef}>
          <div className="pos-relative">
            <DayPickerRangeController
              startDate={startDate}
              noBorder={true}
              endDate={endDate}
              isOutsideRange={day => isInclusivelyAfterDay(today, day)}
              onOutsideClick={DayPickerRangeController.onOutsideClick}
              enableOutsideDays={false}
              numberOfMonths={2}
              onPrevMonthClick={DayPickerRangeController.onPrevMonthClick}
              onNextMonthClick={DayPickerRangeController.onNextMonthClick}
              onDatesChange={onDatesChange} 
              focusedInput={focusedInput} 
              onFocusChange={onFocusChange} 
            />
            <span className="apply-search" onClick={this.props.search}>Apply</span>
          </div>
        </div>
        }

      <button 
        className={this.applyFilterClasses("NUM_GUESTS")}
        onClick={handleOpenGuestSelect}
        ref={(input) => this.guestSelect = input}>
        {numGuests > 0 ? `${numGuests} Adult${numGuests > 1 ? 's' : ''}` : 'Guests'}
      </button>

      { openGuestSelect && 
        <div 
          className='guest-select-container' 
          ref={this.setGuestSelectorRef}>
          <div className="pos-relative flex-container">
            <p>Adults</p>
            <button className={`button add-subtract sub ${numGuests <= 1 ? 'disabled' :''}`} onClick={handleNumGuestChange(false)}></button>
            <span className="guest-count">{numGuests}</span>
            <button className="button add-subtract add" onClick={handleNumGuestChange(true)}></button>

            <span className="apply-search" onClick={search}>Apply</span>
          </div>
        </div>
      }

    {/* TO DO: Update this to be filters for price and amenities

      <button className="button button--inline button--outlined">Amenities</button>

      <button className="button button--inline button--outlined">Price</button>
      { (this.props.location.pathname && 
      this.props.location.pathname != "/") &&
      <div className="filters">
        {(start_date && end_date) && 
          <button className="button button--inline button--outlined">
          From: {moment(start_date).format('ddd, MMM Do')} - {moment(end_date).format('ddd, MMM Do')} <span onClick={() => this.removeFilter('DATES')} className="remove-filter">&times;</span>
          </button>
        }
        { this.state.numGuests ? 
          <button className="button button--inline button--outlined">
          Guests: {numGuests} <span onClick={() => this.removeFilter('MAX_GUESTS')} className="remove-filter">&times;</span></button>
          : null
        }
    </div>
    } */}
    </section>
  );
  }
}

export default withRouter(SearchFilterBar);