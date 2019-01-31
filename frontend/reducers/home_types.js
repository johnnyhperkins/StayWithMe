
const defaultState = {
  1: {
    id: 1,
    name: 'Entire Home'
  },
  2: {
    id: 2,
    name: 'Entire Apartment'
  },
  3: {
    id: 3,
    name: 'Shared Room'
  },
  4: {
    id: 4,
    name: 'Private Room'
  },
};


export const home_types = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    
    default:
      return state;
  }
}

export default home_types;