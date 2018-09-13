import searchActionTypes from './actions/actionTypes';

const DEFAULT_STATE = {
  cars: [],
  errorObject: {},
};

const fetchSearch = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST:
    return {
      ...state,
      cars: [],
      errorObject: {},
    };

  case searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST_SUCCESS:
    return {
      ...state,
      cars: action.cars,
      errorObject: {},
    };

  case searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST_FAIL:
    return {
      ...state,
      cars: [],
      errorObject: action.error,
    };

  default:
    return state;
  }
};

export default fetchSearch;
