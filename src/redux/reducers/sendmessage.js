const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        alertMsg: 'Sending ...',
      };
    }
    case 'SEND_MESSAGE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    }
    case 'SEND_MESSAGE_REJECTED': {
      return {
        ...state,
        isError: true,
        alertMsg: '',
        isSuccess: false,
      };
    }
    default: {
      return state;
    }
  }
};
