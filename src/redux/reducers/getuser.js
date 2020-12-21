const initialState = {
  user: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  userList: {},
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
    case 'GET_USERS_PENDING': {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        alertMsg: 'Loading ...',
      };
    }
    case 'GET_USERS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        userList: action.payload.data,
        isError: false,
      };
    }
    case 'GET_USERS_REJECTED': {
      return {
        ...state,
        isError: true,
        isSuccess:false,
        alertMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};
