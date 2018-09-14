import reducer from '../searchReducer';
import types from '../actions/actionTypes';

describe('Search reducer', () => {
  const initialState = {
    cars: [],
    errorObject: {},
  };
  const results = {
    cars: [
      {
        passengers: [1, 2, 3, 4, 5],
        insurance: 'good',
        bestFuel: 'yes',
        model: 'Mercedes',
        color: 'blue',
      },
      {
        passengers: [1, 2],
        insurance: 'basic',
        bestFuel: 'yes',
        model: 'Mercedes',
        color: 'blue',
      },
    ],
    errorObject: {},
  };

  const errorObject = {
    message: 'Network error',
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_SEARCH_RESULTS_REQUEST', () => {
    expect(reducer(initialState, { type: types.FETCH_SEARCH_RESULTS_REQUEST })).toEqual({
      cars: [],
      errorObject: {},
    });
  });

  it('should handle FETCH_SEARCH_RESULTS_REQUEST_SUCCESS', () => {
    expect(
      reducer(initialState, {
        cars: results.cars,
        type: types.FETCH_SEARCH_RESULTS_REQUEST_SUCCESS,
      }),
    ).toEqual(results);
  });

  it('should handle FETCH_SEARCH_RESULTS_REQUEST_FAIL', () => {
    expect(
      reducer(initialState, { type: types.FETCH_SEARCH_RESULTS_REQUEST_FAIL, error: errorObject }),
    ).toEqual({ cars: [], errorObject });
  });
});
