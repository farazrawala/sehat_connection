const INITIAL_STATE = {
  userData: {},
  patientMedicines: [],
  cartData: [],
  userLocation: {},
};

export default (state = INITIAL_STATE, action) => {
  // console.log('action __ ', action)
  // console.log('state __', state);
  switch (action.type) {
    case 'USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };

    case 'USER_LOCATION':
      return {
        ...state,
        userLocation: action.payload,
      };
    case 'CART_DATA':
      return {
        ...state,
        cartData: action.payload,
      };

    // case 'POST_DATA':
    //   return {
    //     ...state,
    //     userData: action.payload,
    //   };
    // case 'CONTAINERS_DATA':
    //   console.log('actions :: ', action.payload.ContainerData);
    //   // state.ContainerData.push(action.payload.ContainerData[0]);
    //   return {
    //     ...state,
    //     ContainerData: action.payload.ContainerData,
    //   };
    // case 'CONTAINERS_DATA':
    //   console.log('actions :: ', action.payload.ContainerData);
    //   // state.ContainerData.push(action.payload.ContainerData[0]);
    //   return {
    //     ...state,
    //     ContainerData: action.payload.ContainerData,
    //   };
    default:
      return state;
  }
};
