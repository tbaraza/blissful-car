import initialSearchActionTypes from '../actions/actionTypes';

const DEFAULT_STATE = {
  cars: [],
  errorObject: {},
};

const fetchInitialSearch = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case initialSearchActionTypes.FETCH_INITIAL_SEARCH_RESULTS_REQUEST:
    return {
      ...state,
      cars: [],
      errorObject: {},
    };

  case initialSearchActionTypes.FETCH_INITIAL_SEARCH_RESULTS_REQUEST_SUCCESS:
    return {
      ...state,
      cars: action.cars,
      errorObject: {},
    };

  case initialSearchActionTypes.FETCH_INITIAL_SEARCH_RESULTS_REQUEST_FAIL:
    return {
      ...state,
      cars: [],
      errorObject: action.error,
    };

  default:
    return state;
  }
};

export default fetchInitialSearch;
