import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

const MiniSlider = ({listing_id, photos, className}) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className
    };
    return (
      <Slider {...settings}>
        {photos && photos.length ? photos.map((photo, idx) => {
          return (
            <Link key={listing_id} to={`/listings/${listing_id}`}>
              <img className="listing-thumb" key={idx} src={photo} />
            </Link>
          )
        })
        : null //put in a default blank pic?
        }
      </Slider>
    );
};

export default MiniSlider;