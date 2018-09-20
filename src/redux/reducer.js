import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import weather from '../modules/weather';
import common from '../modules/common';

const reducer = combineReducers({
  form,
  weather,
  common
});

export default reducer;