import searchActionTypes from '../../redux/modules/search/actions/actionTypes';

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
      ...state,
      error: false,
      loading: true,
      success: false,
    };

  case searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST_SUCCESS:
    return {
      ...state,
      error: false,
      loading: false,
      success: true,
    };

  case searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST_FAIL:
    return {
      ...state,
      error: true,
      loading: false,
      success: false,
    };

  default:
    return state;
  }
};

export default reducer;
