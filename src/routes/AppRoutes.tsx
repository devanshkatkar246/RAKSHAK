import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { ROUTES } from '../constants/routes';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Chat from '../pages/Chat';
import Health from '../pages/Health';
import Medications from '../pages/Medications';
import SOS from '../pages/SOS';
import Family from '../pages/Family';
import Reports from '../pages/Reports';
import Notifications from '../pages/Notifications';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.CHAT,
        element: <Chat />,
      },
      {
        path: ROUTES.HEALTH,
        element: <Health />,
      },
      {
        path: ROUTES.MEDICATIONS,
        element: <Medications />,
      },
      {
        path: ROUTES.SOS,
        element: <SOS />,
      },
      {
        path: ROUTES.FAMILY,
        element: <Family />,
      },
      {
        path: ROUTES.REPORTS,
        element: <Reports />,
      },
      {
        path: ROUTES.NOTIFICATIONS,
        element: <Notifications />,
      },
      {
        path: ROUTES.PROFILE,
        element: <Profile />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
      },
      {
        path: '*',
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
    ],
  },
]);

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};
