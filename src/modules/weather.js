import { all, call, put, takeEvery } from 'redux-saga/effects';

import { getCurrentWeatherApi } from '../api/weatherApi';

const moduleName = 'weather';

const GET_CURRENT_WEATHER_TRIGGER = `${moduleName}/GET_CURRENT_WEATHER_TRIGGER`;
const GET_CURRENT_WEATHER_REQUEST = `${moduleName}/GET_CURRENT_WEATHER_REQUEST`;
const GET_CURRENT_WEATHER_SUCCESS = `${moduleName}/GET_CURRENT_WEATHER_SUCCESS`;
const GET_CURRENT_WEATHER_FAILURE = `${moduleName}/GET_CURRENT_WEATHER_FAILURE`;

const initialState = {
  loading: false,
  loaded: false,
  cityCode: '',
  currentWeather: {},
  error: {}
};

export const requestCurrentWeather = (cityCode, history) => ({
  type: GET_CURRENT_WEATHER_TRIGGER,
  cityCode,
  history
});

export default function reducer(state = initialState, { type, cityCode, currentWeather = {}, error = {} }) {
  switch (type) {
    case GET_CURRENT_WEATHER_REQUEST:
      return { ...state, cityCode, currentWeather, error, loading: true };
    case GET_CURRENT_WEATHER_SUCCESS:
      return { ...state, currentWeather, loading: false, loaded: true };
    case GET_CURRENT_WEATHER_FAILURE:
      return { ...state, error, loading: false, };
    default:
      return state;
  }
}

const getCurrentWeatherSaga = function* (action) {
  const { cityCode, history } = action;
  yield put({ type: GET_CURRENT_WEATHER_REQUEST, cityCode });
  try {
    const result = yield call(getCurrentWeatherApi, cityCode);
    if (result.response.ok) {
      const currentWeather = result.data;
      yield put({ type: GET_CURRENT_WEATHER_SUCCESS, currentWeather });
      yield call(history.push, '/current');
    } else {
      const { error } = result;
      yield put({ type: GET_CURRENT_WEATHER_FAILURE, error });
    }
  } catch (error) {
    yield put({ type: GET_CURRENT_WEATHER_FAILURE, error });
  }
};

export const weatherSagas = function* () {
  yield all([
    takeEvery(GET_CURRENT_WEATHER_TRIGGER, getCurrentWeatherSaga),
  ]);
};
