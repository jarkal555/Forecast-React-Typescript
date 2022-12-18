export type Weather = {
  name: string;
  wind: {
    speed: string;
  };
  main: {
    temp: number;
    humidity: string;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    description: string;
  };
};

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  benchmark?: string;
  format?: string;
}

export const initAddress = (options?: Partial<Address>): Address => {
  const defaults = {
    benchmark: 'Public_AR_Census2020',
    format: 'json',
  };

  return {
    ...defaults,
    ...options,
  };
};

// Redux Data Type
export type WeatherReduxState = {
  periods: object[];
  error: string;
};

export type GeoCodeReduxState = {
  addressMatches: object[];
  error: string;
};
