import * as Icons from '../static_assets/amenity_icons';

const defaultState = {
  1: {
    id: 1,
    name: 'A/C',
    icon: 'AirCon'
  },
  2: {
    id: 2,
    name: 'Wifi',
    icon: 'Wifi'
  },
  3: {
    id: 3,
    name: 'Kitchen',
    icon: 'Kitchen'
  },
  4: {
    id: 4,
    name: 'Cable TV',
    icon: 'TV'
  },
  5: {
    id: 5,
    name: 'Iron',
    icon: 'Iron'
  },
  6: {
    id: 6,
    name: 'Washer',
    icon: 'Washer'
  },
  7: {
    id: 7,
    name: 'Dryer',
    icon: 'Dryer'
  },
}


export const amenities = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    
    default:
      return state;
  }
}

export default amenities;