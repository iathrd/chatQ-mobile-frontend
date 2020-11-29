const initialState = {
  data: {data:[]},
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_MESSAGE': {
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
