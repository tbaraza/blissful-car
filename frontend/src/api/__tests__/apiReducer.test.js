import reducer from '../reducer/apiReducer';
import types from '../../redux/modules/search/actions/actionTypes';

describe('API reducer', () => {
  const initialState = {
    error: false,
    loading: false,
    success: false,
  };
  const apiStateSuccess = {
    error: false,
    loading: false,
    success: true,
  };

  const apiStateFail = {
    error: true,
    loading: false,
    success: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_SEARCH_RESULTS_REQUEST', () => {
    expect(reducer(initialState, { type: types.FETCH_SEARCH_RESULTS_REQUEST })).toEqual({
      error: false,
      loading: true,
      success: false,
    });
  });

  it('should handle FETCH_SEARCH_RESULTS_REQUEST_SUCCESS', () => {
    expect(reducer(initialState, { type: types.FETCH_SEARCH_RESULTS_REQUEST_SUCCESS })).toEqual(
      apiStateSuccess,
    );
  });

  it('should handle FETCH_SEARCH_RESULTS_REQUEST_FAIL', () => {
    expect(reducer(initialState, { type: types.FETCH_SEARCH_RESULTS_REQUEST_FAIL })).toEqual(
      apiStateFail,
    );
  });
});
