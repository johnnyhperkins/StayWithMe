import React from 'react';
import Slider from "react-slick";

const InfoWindowSlider = ({listing_id, photos, className, onClick}) => {
    const settings = {
      dots: false,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      className,
    };
    return (
      <Slider {...settings}>
        {photos && photos.length ? photos.map((photo, idx) => {
          return (
            <a href={`/#/listings/${listing_id}`} key={idx} target="blank">
              <img src={photo} className="listing-thumb" />
            </a>
          )
        })
        : null 
        }
      </Slider>
    );
};

export default InfoWindowSlider;