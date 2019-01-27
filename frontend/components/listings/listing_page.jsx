import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchListing, fetchAmenitiesAndHomeTypes } from '../../actions/listings'
import Loading from '../misc/loading';
import { isInclusivelyAfterDay, DayPickerRangeController } from 'react-dates';
import moment from 'moment';

const today = moment();

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate:'',
      endDate:'',
      focusedInput: 'startDate',
      calendarFocused: null,
    }
  }

  componentDidMount() {
    const { fetchListing } = this.props;
    fetchListing(this.props.match.params.id);

  }

  onFocusChange = (focusedInput) => {
    this.setState({
      focusedInput: !focusedInput ? 'startDate' : focusedInput,
    });
  }

  render() {
    const { listingLoading } = this.props;
    if(listingLoading) {
      return <Loading />
    }
    const { title, address, price } = this.props.listing;
    let { startDate, endDate, focusedInput } = this.state;
    return (
      <>
      <section className="image-header-container flush-top flex-container">
        <div className="left-half grid--50">
          <img src="https://s3.us-east-2.amazonaws.com/stay-with-me/IMG_0938.jpg" alt=""/>
        </div>
        <div className="right-half grid--50">
          <div className="square-image grid--50">
            <img src="https://s3.us-east-2.amazonaws.com/stay-with-me/IMG_1638.jpg" alt=""/>
          </div>
          <div className="square-image grid--50">
            <img src="https://s3.us-east-2.amazonaws.com/stay-with-me/IMG_0924.jpg" alt=""/>
          </div>
          <div className="square-image grid--50">
            <img src="https://s3.us-east-2.amazonaws.com/stay-with-me/IMG_1637.jpg" alt=""/>
          </div>
          <div className="square-image grid--50">
            <img src="https://s3.us-east-2.amazonaws.com/stay-with-me/IMG_0940.jpg" alt=""/>
          </div>
        </div>
      </section>
      <section className="content-container--interior-page flex-container">
        <section className="listing-details-container grid--75">
          <h2>{title}</h2>
          <p>{address}</p>
          <div className="amenities">
            
          </div>
        </section>
        <aside className="floating-booking-container">
          <h3>${price} <span className="tiny">per night</span></h3>
          Rating
          <hr/>
          <span className="tiny">Dates</span>
          <DayPickerRangeController
                startDate={startDate}
                endDate={endDate}
                isOutsideRange={day => isInclusivelyAfterDay(today, day)}
                onOutsideClick={DayPickerRangeController.onOutsideClick}
                enableOutsideDays={false}
                numberOfMonths={1}
                onPrevMonthClick={DayPickerRangeController.onPrevMonthClick}
                onNextMonthClick={DayPickerRangeController.onNextMonthClick}
                onDatesChange={({ startDate, endDate }) => this.setState({ 
                    startDate, 
                    endDate, 
                    start_date: startDate && moment(startDate).format('YYYY-MM-DD HH:mm:00'),
                    end_date: endDate && moment(endDate).format('YYYY-MM-DD HH:mm:00'), 
                  })  
                } 
                focusedInput={focusedInput} 
                onFocusChange={this.onFocusChange} 
              />
        </aside>
      </section>
      </>
    )
  }
}

const msp = (state, props) => ({
  listing: state.entities.listings[props.match.params.id],
  listingLoading: state.ui.listingLoading
})

const mdp = dispatch => ({
  fetchListing: id => dispatch(fetchListing(id)),
  fetchAmenitiesAndHomeTypes: am => dispatch(fetchAmenitiesAndHomeTypes(am))
})

export default withRouter(connect(msp,mdp)(Listing));
