const initialState = {
  isLoginn: false,
  token: '',
  isLoading: false,
  isError: false,
  isSuccess: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CRETE_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess:false,
        alertMsg: 'Login ...',
      };
    }
    case 'CRETE_PROFILE_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isLoginn: true,
        isSuccess:true,
        isError: false,
      };
    }
    case 'CRETE_PROFILE_REJECTED': {
      return {
        ...state,
        isError: true,
        isSuccess:false,
        alertMsg: 'Wrong email or password',
      };
    }

    case 'CREATE_AVATAR_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess:false,
        alertMsg: 'Login ...',
      };
    }
    case 'CREATE_AVATAR_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    }
    case 'CREATE_AVATAR_REJECTED': {
      return {
        ...state,
        isError: true,
        isSuccess:false,
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
