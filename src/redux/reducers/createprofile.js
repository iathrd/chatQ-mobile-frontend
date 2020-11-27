const initialState = {
  isLoginn: false,
  token: '',
  isLoading: false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CRETE_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Login ...',
      };
    }
    case 'CRETE_PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isLoginn: true,
        isError: false,
      };
    }
    case 'CRETE_PROFILE_REJECTED': {
      return {
        ...state,
        isError: true,
        alertMsg: 'Wrong email or password',
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        isLoginn: false,
        token: '',
      };
    }
    default: {
      return state;
    }
  }
};
