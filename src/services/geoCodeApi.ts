import axios from 'axios';

const getGeoCode = (query: string) => {
  return axios.get(
    `https://geocoding.geo.census.gov/geocoder/locations/address?${query}`,
    {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': true,
        Origin: 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      },
    }
  );
};

export default {
  getGeoCode,
};
