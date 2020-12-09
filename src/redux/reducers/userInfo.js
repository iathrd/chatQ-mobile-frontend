const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER_INFO': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: action.payload,
        alertMsg: 'Loading ...',
      };
    }
    default: {
      return state;
    }
  }
};
