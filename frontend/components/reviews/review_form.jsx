import React, { Component } from 'react';
import { createReview } from '../../actions/reviews';
import { receiveSessionErrors } from '../../actions/sessions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    console.log(props.listing_id);
    this.state = {
      
      review: {
          rating: 0,
          review_body: '',
          listing_id: props.listing_id
      },
      errors: [], 
    }
    
  }

  componentDidMount() {
    const { errors, receiveSessionErrors } = this.props;

    if(this.state.errors.length ) {
      receiveSessionErrors([]);
    }
  }

  componentWillUnmount() {
      receiveSessionErrors([]);
  }

  handleSubmit = () => {
    console.log(this.state.review);
    this.props.createReview(this.state.review);
  }

  handleInput = (e) => {
    console.log(e.target);
    this.setState({
      review: {
        ...this.state.review,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    const { rating, review_body } = this.state.review;
    const { errors } = this.state;
    return (
      <>
      <section className="review-form">
        <div className="grid--75__header flex-container">
          <p>Leave your review</p>
          {!isEmpty(errors) && errors.map((m, idx) => <h6 className="text--green message" key={idx} >{m}</h6>)}
        </div>
        <div className="form-wrapper">
          
            <label>Rating</label>
              <input 
                className="text-input"
                autoComplete="off"
                type="number" 
                name="rating"
                value={rating} 
                onChange={this.handleInput} 
                />
          
            <label>Review</label>
              <textarea
                className="text-input"
                name="review_body"
                value={review_body} 
                onChange={this.handleInput}  
                >{review_body}</textarea>
          { !isEmpty(errors) && (
                  <>
                  <ul className="session-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                  </ul>
                  </>
                  ) 
              }
        </div>
        <section>
          <button onClick={this.handleSubmit} className="button--submit inline-block" >Save</button>
        </section>  
      </section>
      </>
    )
  }
}

const mdp = (dispatch) => {
    return {
    receiveSessionErrors: errors => dispatch(receiveSessionErrors(errors)),
    createReview: review => dispatch(createReview(review))
  }
}

export default connect(null,mdp)(ReviewForm)