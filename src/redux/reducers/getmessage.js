const initialState = {
  data: [],
  pageInfo: {},
  loadMessage: {},
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MESSAGE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Loading ...',
      };
    }
    case 'GET_MESSAGE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo,
        isError: false,
      };
    }
    case 'GET_MESSAGE_REJECTED': {
      return {
        ...state,
        isError: true,
        alertMsg: '',
      };
    }

    case 'LOAD_MESSAGE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Loading ...',
      };
    }
    case 'LOAD_MESSAGE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        loadMessage: action.payload.data,
        isError: false,
      };
    }
    case 'LOAD_MESSAGE_REJECTED': {
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
