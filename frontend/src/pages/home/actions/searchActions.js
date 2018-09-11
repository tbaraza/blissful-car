import searchActionTypes from './actionTypes';
import apiClient from '../../../api/apiClient';

// selectors
export const getCars = state => state.search;

export const fetchSearchRequest = () => ({
  type: searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST,
});

export const fetchSearchRequestSuccess = payload => ({
  type: searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST_SUCCESS,
  cars: payload.data,
});

export const fetchSearchRequestFail = error => ({
  type: searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST_FAIL,
  error,
});

export const fetchSearchResults = values => async (dispatch) => {
  const {
    passengers, insurance, bestFuel, model, color,
  } = values;

  dispatch(fetchSearchRequest());

  try {
    const response = await apiClient(
      'get',
      `/search?passengers=${passengers}&insurance=${insurance}&bestFuel=${bestFuel}&model=${model}&color=${color}`,
    );
    dispatch(fetchSearchRequestSuccess(response));
  } catch (error) {
    if (error.response) {
      dispatch(fetchSearchRequestFail(error.response));
    } else {
      dispatch(fetchSearchRequestFail(error));
    }
  }
};
