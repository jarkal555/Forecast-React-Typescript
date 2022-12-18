const toCelsius = (value: number): string => {
  return ((value - 32) / 1.8).toFixed(1);
};

export default toCelsius;
