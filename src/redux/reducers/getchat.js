const initialState = {
  data: {},
  isLoading: false,
  loadData: {},
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
        data: action.payload.data,
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

    case 'LOAD_CHAT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Login ...',
      };
    }
    case 'LOAD_CHAT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        loadData: action.payload.data,
        isError: false,
      };
    }
    case 'LOAD_CHAT_REJECTED': {
      return {
        ...state,
        isError: true,
        alertMsg: '',
      };
    }

    case 'SAVE_CHAT': {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
      };
    }

    default: {
      return state;
    }
  }
};
