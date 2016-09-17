import { combineReducers } from 'redux';
import { data } from './data';
import { ui } from './ui';

const reducer = combineReducers({
  ui,
  data
});

export default reducer;
