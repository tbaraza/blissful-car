import { combineReducers } from 'redux';
import fetchSearch from '../modules/search/searchReducer';
import apiCallState from '../../api/reducer/apiReducer';

const rootReducer = combineReducers({
  search: fetchSearch,
  apiCallState,
});

export default rootReducer;
