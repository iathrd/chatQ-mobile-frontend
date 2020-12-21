const initialState = {
  data: {data:[]},
  isLoading: false,
  isSuccess:false,
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_MESSAGE': {
      return {
        ...state,
        isError: false,
        data: action.payload,
        isSuccess:true,
        alertMsg: 'Loading ...',
      };
    }
    default: {
      return state;
    }
  }
};
