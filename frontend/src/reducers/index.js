import { combineReducers } from 'redux';
import fetchInitialSearch from '../pages/home/reducer/initialSearchReducer';

const rootReducer = combineReducers({
  cars: fetchInitialSearch,
});

export default rootReducer;
