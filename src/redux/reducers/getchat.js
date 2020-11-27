const initialState = {
  data: [],
  pageInfo: {},
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHAT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Login ...',
      };
    }
    case 'GET_CHAT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
        isError: false,
      };
    }
    case 'GET_CHATE_REJECTED': {
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
