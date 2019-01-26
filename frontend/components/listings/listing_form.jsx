import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
import { NavLink } from 'react-router-dom';

class ListingForm extends Component {
  constructor(props) {
    super(props);
    const { user_id } = this.props;
    this.state = {
      user_id,
      title: '', 
      thumb_img: '', 
      address: '', 
      lat: 0,
      lng: 0,
      price: 0,
      home_type_id: '',
      description: '',
      max_guests: '',
      images: [] 
    }
  }

  handleInput = (e) => {
    this.setState({
      ...this.state.user,
      [e.target.name]: e.target.value
    })
  }

  render() {
    let { title, thumb_img, address, price, home_type_id, description, max_guests, images} = this.state;
    let { errors } = this.props;
    console.log(errors);
    return (
      <section className="content-container content-container--new-listing">
        <h2>Lets get started listing your place.</h2>
        <div className="form-wrapper">
        {/* {!isEmpty(messages) && messages.map((m, idx) => <p key={idx} >{m}</p>)} */}
              <input 
                className="text-input"
                type="text" 
                placeholder="Title"
                name="title"
                value={title} 
                onChange={this.handleInput} 
                />
              <input 
                className="text-input"
                type="text" 
                placeholder="Thumb Img"
                name="thumb_img"
                value={thumb_img} 
                onChange={this.handleInput} 
                />
              <input 
                className="text-input"
                type="text" 
                placeholder="Address"
                name="address"
                value={address} 
                onChange={this.handleInput} 
                />
              
              <input 
                className="text-input"
                type="text" 
                placeholder="Price"
                name="price"
                value={price} 
                onChange={this.handleInput} 
                /> 
              <input 
                className="text-input"
                type="text" 
                placeholder="Home Type"
                name="home_type_id"
                value={home_type_id} 
                onChange={this.handleInput} 
                />
              <textarea 
                className="text-area" 
                name="description"
                value={description} 
                onChange={this.handleInput} 
                />
              <input 
                className="text-input"
                type="number" 
                placeholder="Max Guests"
                name="max_guests"
                value={max_guests} 
                onChange={this.handleInput} 
                />
              <input 
                className="text-input"
                type="text" 
                placeholder="Images"
                name="images"
                value={images} 
                onChange={this.handleInput} 
                />
          
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
    )
  }
}

export default ListingForm