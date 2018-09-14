import * as actions from '../actions/searchActions';
import types from '../actions/actionTypes';
import * as api from '../../../../api/apiClient';

let dispatch;
const responses = {
  success: {
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
  },
  fail: Promise.reject({ message: 'missing property' }),
};

describe('actions test', () => {
  beforeEach(() => {
    jest.spyOn(api, 'default').mockImplementation(() => Promise.resolve(responses.success));
    dispatch = jest.fn();
  });

  it('should search successfully when all required field are supplied', async () => {
    const values = {
      passengers: 1,
      insurance: 'good',
      bestFuel: 'yes',
    };
    await actions
      .fetchSearchResults(values)(dispatch)
      .then(async () => {
        expect(api.default).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: types.FETCH_SEARCH_RESULTS_REQUEST });
        expect(dispatch.mock.calls[1][0]).toEqual({
          cars: responses.cars,
          type: types.FETCH_SEARCH_RESULTS_REQUEST_SUCCESS,
        });
      });
  });

  // it('should return an error', async () => {
  //   jest.spyOn(api, 'default').mockImplementation(() => Promise.resolve(responses.fail));
  //   await actions.fetchSearchResults({})(dispatch);
  //   expect(api.default).toHaveBeenCalledTimes(2);
  //   expect(dispatch).toHaveBeenCalledTimes(2);
  //   expect(dispatch.mock.calls[0][0]).toEqual({ type: types.FETCH_SEARCH_RESULTS_REQUEST });
  //   expect(dispatch.mock.calls[1][0]).toEqual({
  //     error: { message: 'missing property' },
  //     type: types.FETCH_SEARCH_RESULTS_REQUEST_FAIL,
  //   });
  // });
});
