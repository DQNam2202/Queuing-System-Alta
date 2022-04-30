import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import { RouteObject } from 'react-router-dom';

//Public Pages

//Admin Pages
import Dashboard from '../pages/Layout/Dashboard';
import Page404 from '../components/Page404';
import Login from '../pages/Home/Login';
import CreateNewPassword from '../pages/Home/CreateNewPassword';
import ResetPassword from '../pages/Home/ResetPassword';
import GearLevelDevice from '../pages/Users/GearLevelDevice';
import SettingDisplayDevice from '../pages/Users/SettingDisplayDevice';
import SettingGearDevice from '../pages/Users/SettingGearLevelDevice';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PublicRoute>
        <h2>Wellcome to DuongNam</h2>
      </PublicRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/resetpass',
    element: (
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: '/newpass',
    element: (
      <PublicRoute>
        <CreateNewPassword />
      </PublicRoute>
    ),
  },
  {
    path: '/leveldevice',
    element: (
      <PublicRoute>
        <GearLevelDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/settingdevice',
    element: (
      <PublicRoute>
        <SettingDisplayDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/settinglevel',
    element: (
      <PublicRoute>
        <SettingGearDevice />
      </PublicRoute>
    ),
  },
  {
    path: '*',
    element: (
      <PublicRoute>
        <Page404 />
      </PublicRoute>
    ),
  },
];

export const privateRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
];
