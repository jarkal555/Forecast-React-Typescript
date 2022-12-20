import axios from 'axios';

const getGeoCode = (query: string) => {
  return axios.get(
    `https://geocoding.geo.census.gov/geocoder/locations/address?${query}`
  );
};

const geoCodeApi = {
  getGeoCode,
};

export default geoCodeApi;
