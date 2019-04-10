import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Slider from 'react-rangeslider'
import 'react-dates/initialize'

import { isInclusivelyAfterDay, DayPickerRangeController } from 'react-dates'
import moment from 'moment'
import _ from 'lodash'

const today = moment()

class SearchFilterBar extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutsideDatePicker)
		document.addEventListener('mousedown', this.handleClickOutsideGuestSelector)
		document.addEventListener('mousedown', this.handleClickOutsidePriceFilter)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutsideDatePicker)
		document.removeEventListener(
			'mousedown',
			this.handleClickOutsideGuestSelector,
		)
		document.removeEventListener(
			'mousedown',
			this.handleClickOutsidePriceFilter,
		)
	}

	handleClickOutsideDatePicker = event => {
		if (this.DatePickerRef && !this.DatePickerRef.contains(event.target)) {
			this.props.handleOpenDatePicker()
		}
	}

	setDatePickerRef = node => {
		this.DatePickerRef = node
	}

	handleClickOutsidePriceFilter = event => {
		if (this.PriceFilterRef && !this.PriceFilterRef.contains(event.target)) {
			this.props.handleOpenPriceFilter()
		}
	}

	setPriceFilterRef = node => {
		this.PriceFilterRef = node
	}

	handleClickOutsideGuestSelector = event => {
		if (
			this.GuestSelectorRef &&
			!this.GuestSelectorRef.contains(event.target)
		) {
			this.props.handleOpenGuestSelect()
		}
	}

	setGuestSelectorRef = node => {
		this.GuestSelectorRef = node
	}

	applyFilterClasses = field => {
		const inactiveClasses = 'button button--inline button--outlined'
		const activeClasses = `${inactiveClasses} filter-active`
		switch (field) {
			case 'PRICE':
				return this.props.price > 0 ? activeClasses : inactiveClasses
			case 'NUM_GUESTS':
				return this.props.numGuests > 0 ? activeClasses : inactiveClasses
			case 'DATES':
				return this.props.startDate && this.props.endDate
					? activeClasses
					: inactiveClasses
			default:
				break
		}
	}

	render() {
		const {
			numGuests,
			openGuestSelect,
			openDatePicker,
			openPriceSlider,
			handleNumGuestChange,
			handleOpenGuestSelect,
			handleOpenDatePicker,
			handleOpenPriceFilter,
			handlePriceChange,
			onDatesChange,
			onFocusChange,
			focusedInput,
			startDate,
			endDate,
			price,
			search,
			clearFilters,
		} = this.props

		const filtersApplied =
			this.props.price > 0 ||
			this.props.numGuests > 0 ||
			(this.props.startDate && this.props.endDate)

		return (
			<section className="filter-bar flex-container--no-justify">
				<button
					className={this.applyFilterClasses('DATES')}
					onClick={handleOpenDatePicker}>
					{startDate ? endDate ? (
						`${moment(startDate).format('MMM DD')} - ${moment(endDate).format(
							'MMM DD',
						)}`
					) : (
						moment(startDate).format('MMM DD')
					) : (
						'Dates'
					)}
				</button>

				{openDatePicker && (
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
							<span className="apply-search" onClick={this.props.search}>
								Apply
							</span>
						</div>
					</div>
				)}

				<button
					className={this.applyFilterClasses('NUM_GUESTS')}
					onClick={handleOpenGuestSelect}
					ref={input => (this.guestSelect = input)}>
					{numGuests > 0 ? (
						`${numGuests} Adult${numGuests > 1 ? 's' : ''}`
					) : (
						'Guests'
					)}
				</button>

				{openGuestSelect && (
					<div
						className="guest-select-container"
						ref={this.setGuestSelectorRef}>
						<div className="pos-relative flex-container">
							<p>Adults</p>
							<button
								className={`button add-subtract sub ${numGuests <= 1
									? 'disabled'
									: ''}`}
								onClick={handleNumGuestChange(false)}
							/>

							<span className="guest-count">{numGuests}</span>

							<button
								className="button add-subtract add"
								onClick={handleNumGuestChange(true)}
							/>

							<span className="apply-search" onClick={search}>
								Apply
							</span>
						</div>
					</div>
				)}

				{this.props.location.pathname == '/search' && (
					<button
						onClick={handleOpenPriceFilter}
						className={this.applyFilterClasses('PRICE')}>
						{price > 0 ? `Max $${price}` : 'Price'}
					</button>
				)}

				{openPriceSlider && (
					<div className="price-slider" ref={this.setPriceFilterRef}>
						<p className="small">${price}</p>
						<Slider
							value={price}
							tooltip={false}
							onChange={handlePriceChange}
							max={1000}
							labels={{
								0: 'Min',
								1000: 'Max',
							}}
						/>
						<span className="apply-search" onClick={search}>
							Apply
						</span>
					</div>
				)}
				{filtersApplied && (
					<button
						onClick={clearFilters}
						className="button button--inline button--outlined">
						Clear Filters
					</button>
				)}
			</section>
		)
	}
}

export default withRouter(SearchFilterBar)
