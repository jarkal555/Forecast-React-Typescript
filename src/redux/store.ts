import { configureStore } from '@reduxjs/toolkit';

import geoCodeReducer from 'redux/geoCode/geoCodeSlice';
import weatherReducer from 'redux/weather/weatherSlice';

export default configureStore({
  reducer: {
    geoCode: geoCodeReducer,
    weather: weatherReducer,
  },
});
