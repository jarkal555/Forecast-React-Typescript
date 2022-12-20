import React, { useState, useId } from 'react';
import { useDispatch } from 'react-redux';

// Module
import queryString from 'query-string';
import { Button, TextField } from '@mui/material';
import { ValidationGroup, Validate, AutoDisabler } from 'mui-validate';

// actions
import { fetchGeoCode } from 'redux/geoCode/geoCodeSlice';

// Utils
import { isEmpty } from 'utils';

// import types
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { Address, initAddress } from 'types';

const initialAddress: Address = initAddress({
  street: '',
  city: '',
  state: '',
  zip: '',
});

const AddressFrom: React.FC = (): React.ReactElement => {
  const id: string = useId();
  const dispatch: Dispatch<AnyAction> = useDispatch();

  const [address, setAddress] = useState(initialAddress);

  const query: string = queryString.stringify(address, { skipNull: true });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(fetchGeoCode(query));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ValidationGroup>
          <>
            <Validate
              name="street"
              custom={[(value) => !isEmpty(value), 'Custom validation failed!']}
            >
              <TextField
                id={id + 'street'}
                helperText=""
                label="Street"
                color="success"
                size="small"
                variant="outlined"
                value={address.street}
                onChange={(e) => {
                  setAddress({
                    ...address,
                    street: e.target.value,
                  });
                }}
              />
            </Validate>
            <Validate name="city" required={[true, 'Please enter your city']}>
              <TextField
                id={id + 'city'}
                helperText="Please enter your city"
                label="City"
                color="success"
                size="small"
                variant="outlined"
                value={address.city}
                onChange={(e) => {
                  setAddress({
                    ...address,
                    city: e.target.value,
                  });
                }}
              />
            </Validate>
            <Validate name="state" required={[true, 'Please enter your state']}>
              <TextField
                id={id + 'state'}
                helperText="Please enter your state"
                label="State"
                color="success"
                size="small"
                variant="outlined"
                value={address.state}
                onChange={(e) => {
                  setAddress({
                    ...address,
                    state: e.target.value,
                  });
                }}
              />
            </Validate>
            <TextField
              id={id + 'zip'}
              helperText="Please enter your zip"
              label="Zip"
              color="success"
              size="small"
              variant="outlined"
              value={address.zip}
              onChange={(e) => {
                setAddress({
                  ...address,
                  zip: e.target.value,
                });
              }}
            />
            <p></p>
            <AutoDisabler>
              <Button type="submit" color="error" variant="outlined">
                GET FORECAST
              </Button>
            </AutoDisabler>
            <p></p>
          </>
        </ValidationGroup>
      </form>
    </div>
  );
};

export default AddressFrom;
