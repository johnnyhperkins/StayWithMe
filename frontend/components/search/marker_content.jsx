import React from 'react';
import InfoWindowSlider from '../misc/infowindow_slider';

const MarkerContent = ({ listing, home_types }) => {
  const { photos, price, title, home_type_id, id } = listing;
  return (
    <div className="marker-window">
      <InfoWindowSlider listing_id={id} photos={photos.slice(0,1)} className="results-slider" />
      <div className="marker-window__details">
        {Object.values(home_types).filter(ht => ht.id == home_type_id).map(ht => <h6 key={ht.id} className="text--light-gray">{ht.name}</h6>)}
        <h5>{title}</h5>
        <p className="small bold">${price}<span className="tiny">/night</span></p>
      </div>
    </div>
  );
};

export default MarkerContent;