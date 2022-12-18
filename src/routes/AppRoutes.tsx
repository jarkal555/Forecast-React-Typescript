import React, { lazy } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';

// project imports
import Layout from 'components/MainLayout';

// routing
const WeeklyForecast: React.FC = lazy(() => import('pages/WeeklyForecast'));

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <WeeklyForecast />,
      },
      {
        path: 'week',
        element: <WeeklyForecast />,
      },
    ],
  },
]);

const AppRoutes: React.FC = (): React.ReactElement => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
