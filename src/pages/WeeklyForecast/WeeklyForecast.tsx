import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import toastr from 'toastr';

// Components
import AddressForm from 'components/AddressForm';

// Utils
import { isEmpty, toCelsius } from 'utils';

// actions
import { fetchWeather } from 'redux/weather/weatherSlice';

// Type
import { GridColDef } from '@mui/x-data-grid';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import type {} from '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const WeeklyForecast: React.FC = (): React.ReactElement => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const periods = useSelector((state: any) => state.weather.periods);
  const addressMatches: any[] = useSelector(
    (state: any) => state.geoCode.addressMatches
  );

  let rows: any = [];
  for (let i = 0; i < periods.length; i++) {
    if (periods[i].isDaytime) {
      rows.push({
        id: periods[i].number / 2 + 1,
        icon: periods[i].icon,
        date: periods[i].name,
        forecast: periods[i].shortForecast,
        description: periods[i].detailedForecast,
        temperature: toCelsius(periods[i].temperature) + '°C',
        wind: periods[i].windDirection + ': ' + periods[i].windSpeed,
      });
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'icon',
      headerName: 'Demo',
      headerAlign: 'center',
      width: 80,
      renderCell: (params) => <img src={params.value} alt={'demo'} />,
    },
    {
      field: 'date',
      headerName: 'Date',
      headerAlign: 'center',
      width: 150,
    },
    {
      field: 'forecast',
      headerName: 'Forecast',
      headerAlign: 'center',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Description',
      headerAlign: 'center',
      width: 550,
    },
    {
      field: 'temperature',
      headerName: 'Temperature',
      headerAlign: 'center',
      width: 130,
    },
    {
      field: 'wind',
      headerName: 'Wind',
      headerAlign: 'center',
      width: 200,
    },
  ];

  useLayoutEffect(() => {
    if (isEmpty(addressMatches)) {
      toastr.info('Please type your address.');
    } else {
      let { x, y } = addressMatches[0].coordinates;
      dispatch(fetchWeather([y.toFixed(4), x.toFixed(4)]));
    }
  }, [dispatch, addressMatches]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AddressForm />
        <div style={{ height: '450px', width: '100%', marginTop: '20px' }}>
          <DataGrid hideFooter={true} rows={rows} columns={columns} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default WeeklyForecast;
