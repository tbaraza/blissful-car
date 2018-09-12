import searchActionTypes from '../../redux/modules/search/searchReducer';

export const getApiCallState = state => state.apiCallState;

// reducer
const DEFAULT_STATE = {
  error: false,
  loading: false,
  success: false,
};

const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST:
    return {
      error: false,
      loading: true,
      success: false,
    };

  case searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST_SUCCESS:
    return {
      error: false,
      loading: false,
      success: true,
    };

  case searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST_FAIL:
    return {
      error: true,
      loading: false,
      success: false,
    };

  default:
    return state;
  }
};

export default reducer;
