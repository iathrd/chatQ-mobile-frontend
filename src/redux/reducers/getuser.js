const initialState = {
  user: {},
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Loading ...',
      };
    }
    case 'GET_USER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        user: action.payload.data.data,
        isError: false,
      };
    }
    case 'GET_USER_REJECTED': {
      return {
        ...state,
        isError: true,
        alertMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};
