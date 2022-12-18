import { createSlice } from '@reduxjs/toolkit';

// API
import { geoCodeApi } from 'services';

// Type
import { GeoCodeReduxState } from 'types';

export const geoCodeSlice = createSlice({
  name: 'geoCode',
  initialState: <GeoCodeReduxState>{
    addressMatches: [],
    error: '',
  },
  reducers: {
    getGeoCode: (state, action) => {
      state.addressMatches = action.payload;
    },
    getErrors: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getGeoCode, getErrors } = geoCodeSlice.actions;

export default geoCodeSlice.reducer;

// Thunk function
export const fetchGeoCode: any =
  (queryString: string) =>
  (
    dispatch: (arg0: {
      payload: any;
      type: 'geoCode/getGeoCode' | 'geoCode/getErrors';
    }) => void
  ) => {
    // Get geological code - altitude, longtitude, and etc
    geoCodeApi
      .getGeoCode(queryString)
      .then((res) => {
        console.log(res.data);
        dispatch(getGeoCode(res.data)); // Save geological code in Redux Store
      })
      .catch((err) => {
        dispatch(getErrors(err));
      });
  };
