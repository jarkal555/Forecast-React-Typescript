import axios from 'axios';

const getForecastApi = (points: number[]) => {
  const query = points.join(',');
  return axios.get(`https://api.weather.gov/points/${query}`);
};

const getWeatherForecast = (forecastUrl: string) => {
  return axios.get(forecastUrl);
};

const weatherApi = {
  getForecastApi,
  getWeatherForecast,
};

export default weatherApi;
