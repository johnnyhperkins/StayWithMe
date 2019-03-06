import React from 'react';

import PlacesAutocomplete from 'react-places-autocomplete';

const PlacesAutocompleteComponent = ({
  address, 
  handleChangeAddress, 
  handleSelectAddress, 
  inputProps,
  dropdownClass }) => {
    return (
      <PlacesAutocomplete
        value={address}
        onChange={handleChangeAddress}
        onSelect={handleSelectAddress}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="autocomplete-dropdown-container">
            <input {...getInputProps(inputProps)} />
            <div className={dropdownClass}>
              {loading && <div className="suggestion-item">Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                  const style = suggestion.active
                  ? { backgroundColor: "#fafafa", "cursor": "pointer" }
                  : { backgroundColor: "#ffffff", "cursor": "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <div className="suggestion-list-item">
                      <i className="fas fa-map-marker-alt"></i> <p>{suggestion.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
};

export default PlacesAutocompleteComponent;