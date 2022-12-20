import { createSlice } from '@reduxjs/toolkit';
import toastr from 'toastr';

// API
import { weatherApi } from 'services';

// Util
import { isEmpty } from 'utils';

// Type
import { WeatherReduxState } from 'types';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    periods: [],
    error: [],
  } as WeatherReduxState,
  reducers: {
    getWeather: (state, action) => {
      state.periods = action.payload;
    },
    getErrors: (state, action) => {
      action.payload.map((item: string) => toastr.error(action.payload));
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getWeather, getErrors } = weatherSlice.actions;

export default weatherSlice.reducer;

// Thunk function
export const fetchWeather: any =
  (points: number[]) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: 'weather/getWeather' | 'weather/getErrors';
    }) => void
  ) => {
    let response;
    let errors = [];
    let forecastUrl = '';
    let periods = [];

    try {
      // Get URL to fetch forecast by *Grid points*.
      response = await weatherApi.getForecastApi(points);
      if (!isEmpty(response.data.properties)) {
        forecastUrl = response.data.properties.forecast;
      } else {
        errors.push('Not found forecast URL!');
        dispatch(getErrors(errors));
      }

      // Get 7 day forecast.
      response = await weatherApi.getWeatherForecast(forecastUrl);
      if (!isEmpty(response.data.properties)) {
        periods = response.data.properties.periods;
        dispatch(getWeather(periods)); // Save 7 day forecast in Redux Store
      } else {
        errors.push('Not found forecast!');
        dispatch(getErrors(errors));
      }
    } catch (error: any) {
      // Handle errors
      dispatch(getErrors(error.response.data.errors));
    }
  };
