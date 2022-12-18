import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from 'assets/images/logo.svg';

const MainLayout: React.FC = (): React.ReactElement => {
  return (
    <>
      <img src={Logo} alt="Logo" />
      <h3>Weather Details</h3>
      <Outlet />
    </>
  );
};

export default MainLayout;
