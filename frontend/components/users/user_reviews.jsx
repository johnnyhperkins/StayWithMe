import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchUserReviews} from '../../actions/reviews'
import Loading from '../misc/loading'
import UserReview from './user_review';

class UserReviews extends Component {
  componentDidMount() {
    this.props.fetchUserReviews(this.props.user.id)
  }
  
  render() {
    const { 
      reviewsLoading, 
      reviews } = this.props;
    
    if(reviewsLoading) {
      return <Loading />
    }
    return (
      <>
      <section className="grid--75 margin-left24">
        <div className="grid--75__header">
          <p>Reviews</p>
        </div>
        <div className="content-container--profile user-reviews-container">
          {reviews.length ? 
            reviews.map(review => <UserReview key={review.id} review={review} />)
            :
            <h3>You have not made any reviews</h3>
          }
        </div>
      </section>
      
      </>
    )
  }
}

const msp = state => ({
  session: state.session,
  reviews: Object.values(state.entities.reviews),
  reviewsLoading: state.ui.reviewsLoading
})

const mdp = dispatch => ({
  fetchUserReviews: (id) => dispatch(fetchUserReviews(id)),
})

export default connect(msp,mdp)(UserReviews)