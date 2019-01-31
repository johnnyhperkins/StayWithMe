const defaultState = {
  1: {
    id: 1,
    name: 'A/C',
    icon: ''
  },
  2: {
    id: 2,
    name: 'Heat',
    icon: ''
  },
  3: {
    id: 3,
    name: 'Kitchen',
    icon: ''
  },
  4: {
    id: 4,
    name: 'TV',
    icon: ''
  },
  5: {
    id: 5,
    name: 'Iron',
    icon: ''
  },
  6: {
    id: 6,
    name: 'Fireplace',
    icon: ''
  },
  7: {
    id: 7,
    name: 'Hair dryer',
    icon: ''
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