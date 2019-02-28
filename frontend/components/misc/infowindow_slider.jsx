import React from 'react';
import Slider from "react-slick";

const InfoWindowSlider = ({listing_id, photos, className, onClick}) => {
    const settings = {
      dots: false,
      arrows: false,
      // infinite: true,
      // speed: 500,
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
        : null //put in a default blank pic?
        }
      </Slider>
    );
};

export default InfoWindowSlider;

/* <div className="iw-image-wrapper" > 
  <div className="listing-thumb" key={idx} style={{'backgroundImage': `url(${photo})`}} /> 
</div>*/