import { sendDataWithParams } from '../utils/fetchData';
import { WEATHER_API_KEY, CURRENT_WEATHER_URL } from '../config/consts';

export const getCurrentWeatherApi = cityCode => (
  sendDataWithParams(CURRENT_WEATHER_URL, 'GET', { q: `iata:${cityCode}`, ...WEATHER_API_KEY })
);