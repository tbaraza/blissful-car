import initialSearchActionTypes from './actionTypes';

export const fetchInitialSearchRequest = () => ({
  type: initialSearchActionTypes.FETCH_INITIAL_SEARCH_RESULTS_REQUEST,
});

export const fetchInitialSearchRequestSuccess = payload => ({
  type: initialSearchActionTypes.FETCH_INITIAL_SEARCH_RESULTS_REQUEST_SUCCESS,
  cars: payload.data,
});

export const fetchInitialSearchRequestFail = error => ({
  type: initialSearchActionTypes.FETCH_INITIAL_SEARCH_RESULTS_REQUEST_FAIL,
  error,
});

export const fetchInitialSearchResultsRequest = () => (dispatch) => {
  dispatch(fetchInitialSearchRequest());
  dispatch(fetchInitialSearchRequestSuccess({ data: [] }));
};
