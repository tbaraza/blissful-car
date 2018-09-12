import searchActionTypes from './actionTypes';
import apiClient from '../../../../api/apiClient';

// selectors
export const getCars = state => state.search;

// default search actions
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

// filter search actions
export const fetchFilterRequest = () => ({
  type: searchActionTypes.FETCH_FILTER_RESULTS_REQUEST,
});

export const fetchFilterRequestSuccess = payload => ({
  type: searchActionTypes.FETCH_FILTER_RESULTS_REQUEST_SUCCESS,
  cars: payload.data,
});

export const fetchFilterRequestFail = error => ({
  type: searchActionTypes.FETCH_FILTER_RESULTS_REQUEST_FAIL,
  error,
});

export const fetchFilterResults = values => async (dispatch) => {
  const {
    passengers, insurance, bestFuel, model, color,
  } = values;

  dispatch(fetchFilterRequest());

  try {
    const response = await apiClient(
      'get',
      `/filter-search?passengers=${passengers}&insurance=${insurance}&bestFuel=${bestFuel}&model=${model}&color=${color}`,
    );
    dispatch(fetchFilterRequestSuccess(response));
  } catch (error) {
    if (error.response) {
      dispatch(fetchFilterRequestFail(error.response));
    } else {
      dispatch(fetchFilterRequestFail(error));
    }
  }
};
