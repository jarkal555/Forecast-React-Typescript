import React from 'react';
import { useSelector } from 'react-redux';

import { weekDays } from 'constant';

const TodayForecast: React.FC = (): React.ReactElement => {
  const periods = useSelector((state: any) => state.weather.periods);

  const today = {
    id: periods[0].number / 2 + 1,
    icon: periods[0].icon,
    date: periods[0].name,
    forecast: periods[0].shortForecast,
    description: periods[0].detailedForecast,
    temperature: periods[0].temperature + periods[0].temperatureUnit,
    wind: periods[0].windDirection + ' ' + periods[0].windSpeed,
  };

  const weather = {
    name: '123',
    description: '123',
    speed: 7,
    actualTemperature: 15,
    maxTemperature: 21.5,
    minTemperature: 12.5,
    humidity: 78,
  };

  const nowDay: number = new Date().getDay();
  const weekDayName: string = weekDays[nowDay];

  return (
    <>
      <h4>{weather.actualTemperature}°C</h4>
      <p>{weather.description}</p>
      <ul>
        <li>{weather.name}</li>
        <li>{weekDayName}</li>
        <li>
          Wind: <strong>{weather.speed}</strong>km/h
        </li>
        <li>
          Humidity: <strong>{weather.humidity}%</strong>
        </li>
        <li>
          Maximum Temperature: <strong>{weather.maxTemperature}°C</strong>
        </li>
        <li>
          Minimum Temperature: <strong>{weather.minTemperature}°C</strong>
        </li>
      </ul>
    </>
  );
};

export default TodayForecast;
