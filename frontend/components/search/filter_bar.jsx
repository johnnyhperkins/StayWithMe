import React from 'react';

const SearchFilterBar = ({props}) => {
    return (
      <section className="filter-bar flex-container--no-justify">
        <button className="button button--inline button--outlined ">Dates</button>
        <button className="button button--inline button--outlined">Amenities</button>
        <button className="button button--inline button--outlined">Price</button>
      </section>
    );
};

export default SearchFilterBar;