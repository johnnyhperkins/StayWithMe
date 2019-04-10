import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import 'react-dates/initialize'
import { isInclusivelyAfterDay, DayPickerRangeController } from 'react-dates'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import moment from 'moment'
import queryString from 'query-string'

import SearchIcon from '../../static_assets/search_icon'
import PlacesAutocompleteComponent from '../misc/places_autocomplete_component'

const today = moment()

class HomeLoggedOut extends Component {
	constructor(props) {
		super(props)
		this.state = {
			address: '',
			lng: 0,
			lat: 0,
			startDate: undefined,
			endDate: undefined,
			numGuests: 1,
			focusedInput: 'startDate',
			calendarFocused: null,
			openDatePicker: false,
			openGuestSelect: false,
			errors: '',
			fieldErrors: {},
		}
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutsideDatePicker)
		document.addEventListener('mousedown', this.handleClickOutsideGuestSelector)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutsideDatePicker)
		document.removeEventListener(
			'mousedown',
			this.handleClickOutsideGuestSelector,
		)
	}

	handleClickOutsideDatePicker = event => {
		if (this.DatePickerRef && !this.DatePickerRef.contains(event.target)) {
			this.setState({ openDatePicker: false })
		}
	}

	setDatePickerRef = node => {
		this.DatePickerRef = node
	}

	handleClickOutsideGuestSelector = event => {
		if (
			this.GuestSelectorRef &&
			!this.GuestSelectorRef.contains(event.target)
		) {
			this.setState({ openGuestSelect: false })
		}
	}

	setGuestSelectorRef = node => {
		this.GuestSelectorRef = node
	}

	checkForEmptyFields = () => {
		const fields = [ 'address', 'startDate', 'endDate', 'numGuests' ]
		const fieldErrors = {}

		fields.forEach(field => {
			this.state[field]
				? (fieldErrors[field] = false)
				: (fieldErrors[field] = true)
		})

		return {
			fieldErrors,
			hasErrors: Boolean(
				Object.values(fieldErrors).filter(bool => bool == true).length,
			),
		}
	}

	search = () => {
		const { hasErrors, fieldErrors } = this.checkForEmptyFields()
		if (hasErrors) {
			this.setState({ fieldErrors }, () => {
				if (fieldErrors.address) {
					this.addressInput.focus()
				} else if (fieldErrors.startDate) {
					this.setState({ openDatePicker: true })
				}
			})
		} else {
			const { lat, lng, address, startDate, endDate, numGuests } = this.state

			const start_date = moment(startDate).format('YYYY-MM-DD')
			const end_date = moment(endDate).format('YYYY-MM-DD')

			const urlString = queryString.stringify({
				lat,
				lng,
				start_date,
				end_date,
				address,
				max_guests: numGuests,
			})

			this.props.history.push({
				pathname: '/search',
				search: `?${urlString}`,
			})
		}
	}

	handleChangeAddress = address => this.setState({ address })

	handleSelectAddress = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng =>
				this.setState(
					{
						lng: parseFloat(latLng.lng),
						lat: parseFloat(latLng.lat),
						address,
					},
					() => {
						if (!this.state.startDate) {
							this.setState({
								openDatePicker: true,
								fieldErrors: {
									...this.state.fieldErrors,
									address: false,
								},
							})
						}
					},
				),
			)
	}

	onFocusChange = focusedInput => {
		let { startDate } = this.state
		this.setState(
			{
				focusedInput: !focusedInput ? 'startDate' : focusedInput,
			},
			() => {
				if (!!startDate && !!this.state.endDate) {
					if (startDate < this.state.endDate) {
						this.setState(
							{
								openDatePicker: false,
								fieldErrors: {
									...this.state.fieldErrors,
									startDate: false,
									endDate: false,
								},
							},
							() => this.guestSelect.focus(),
						)
					}
				}
			},
		)
	}

	handleNumGuestChange = add => {
		let { numGuests } = this.state

		return () => {
			if (numGuests >= 0 && numGuests < 20) {
				if (add) {
					this.setState({ numGuests: ++numGuests })
				} else if (numGuests > 1) {
					this.setState({ numGuests: --numGuests })
				}
			}
		}
	}

	handleOpenDatePicker = () => {
		this.setState({
			openDatePicker: !this.state.openDatePicker,
			openGuestSelect: false,
		})
	}

	render() {
		const {
			startDate,
			endDate,
			numGuests,
			openGuestSelect,
			address,
			fieldErrors,
			errors,
		} = this.state

		const startDateString = startDate && startDate.format('ddd, MMM Do')
		const endDateString = endDate && endDate.format('ddd, MMM Do')

		const inputProps = {
			placeholder: 'Try "Manhattan"',
			className: 'location-search-input search-input',
			ref: input => (this.addressInput = input),
		}

		return (
			<section className="home-splash-container">
				<section className="content-container">
					<h1 className="text--white">Plan your next trip</h1>
					<div className="search-container flex-container">
						<div className="search-inputs">
							<div
								className={`search-input-wrapper ${fieldErrors.address &&
									'field-error'}`}>
								<label>
									<p className="search-inputs-label">City, Address, Landmark</p>
									<PlacesAutocompleteComponent
										address={address}
										handleChangeAddress={this.handleChangeAddress}
										handleSelectAddress={this.handleSelectAddress}
										inputProps={inputProps}
										dropdownClass={`autocomplete-dropdown autocomplete-dropdown--splash ${address
											? 'dropdown-open'
											: ''}`}
									/>
								</label>
							</div>
							<div
								className={`date-input-wrapper ${(fieldErrors.startDate ||
									fieldErrors.endDate) &&
									'field-error'}`}
								ref={this.setDatePickerRef}>
								<div className="date-picker-table">
									<div className="date-picker-table-cell">
										<label>
											<p className="search-inputs-label">Check In</p>
											<input
												onClick={this.handleOpenDatePicker}
												type="text"
												name="start date"
												value={startDateString}
												placeholder="mm/dd/yyyy"
												readOnly
											/>
										</label>
									</div>
									<div className="date-picker-table-cell">
										<label>
											<p className="search-inputs-label">Check Out</p>
											<input
												type="text"
												name="end date"
												value={endDateString}
												placeholder="mm/dd/yyyy"
												readOnly
												onClick={this.handleOpenDatePicker}
											/>
										</label>
									</div>
									{this.state.openDatePicker && (
										<div className="range-controller-wrapper">
											<span>{errors && errors}</span>
											<DayPickerRangeController
												startDate={this.state.startDate}
												noBorder={true}
												endDate={this.state.endDate}
												isOutsideRange={day =>
													isInclusivelyAfterDay(today, day)}
												onOutsideClick={DayPickerRangeController.onOutsideClick}
												enableOutsideDays={false}
												numberOfMonths={2}
												onPrevMonthClick={
													DayPickerRangeController.onPrevMonthClick
												}
												onNextMonthClick={
													DayPickerRangeController.onNextMonthClick
												}
												onDatesChange={({ startDate, endDate }) =>
													this.setState({
														startDate,
														endDate,
													})}
												focusedInput={this.state.focusedInput}
												onFocusChange={this.onFocusChange}
											/>
										</div>
									)}
								</div>
							</div>
							<div
								className="guest-input-wrapper"
								ref={this.setGuestSelectorRef}>
								<label>
									<p className="search-inputs-label">Guests</p>
									<input
										type="text"
										placeholder="1 guest"
										value={`${numGuests} guest${numGuests > 1 ? 's' : ''}`}
										ref={input => (this.guestSelect = input)}
										readOnly
										onFocus={() =>
											this.setState({
												openGuestSelect: !openGuestSelect,
												openDatePicker: false,
											})}
									/>
								</label>
								{openGuestSelect && (
									<div className="guest-select-container flex-container">
										<p>Adults</p>
										<button
											className={`button add-subtract sub ${numGuests == 1
												? 'disabled'
												: ''}`}
											onClick={this.handleNumGuestChange(false)}
										/>
										<span className="guest-count">{numGuests}</span>
										<button
											className="button add-subtract add"
											onClick={this.handleNumGuestChange(true)}
										/>
									</div>
								)}
							</div>
						</div>
						<div className="search-icon-wrapper" onClick={this.search}>
							<SearchIcon
								options={{ height: '28px', width: '28px', fill: '#fff' }}
							/>
						</div>
					</div>
				</section>
			</section>
		)
	}
}

export default withRouter(HomeLoggedOut)
