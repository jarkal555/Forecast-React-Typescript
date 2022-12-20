import { createSlice } from '@reduxjs/toolkit';
import toastr from 'toastr';

// API
import { geoCodeApi } from 'services';

// Utils
import { isEmpty } from 'utils';

// Type
import { GeoCodeReduxState } from 'types';

export const geoCodeSlice = createSlice({
  name: 'geoCode',
  initialState: {
    addressMatches: [],
    error: [],
  } as GeoCodeReduxState,
  reducers: {
    getGeoCode: (state, action) => {
      state.addressMatches = action.payload;
    },
    getErrors: (state, action) => {
      action.payload.map((item: string) => toastr.error(action.payload));
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
        // Validation
        if (isEmpty(res.data.result.addressMatches)) {
          dispatch(getErrors(['Not found that address']));
        } else {
          dispatch(getGeoCode(res.data.result.addressMatches)); // Save geological code in Redux Store
        }
      })
      .catch((err) => {
        dispatch(getErrors(err.response.data.errors));
      });
  };
