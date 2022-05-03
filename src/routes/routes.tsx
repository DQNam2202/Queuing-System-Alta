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
import SettingViewDevice from '../pages/Users/SettingViewDeviceCounte';
import ViewDeviceCounte from '../pages/Users/ViewDeviceCounte';
import ViewDeviceMain from '../pages/Users/ViewDeviceMain';
import DrawNumbers from '../pages/User-Interaction/DrawNumbers';
import LoginViewProfile from '../pages/Home/LoginViewProfile';
import PopupNumberPrint from '../pages/User-Interaction/PopupNumberPrint';

export const routes: RouteObject[] = [
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
    path: '/level-device',
    element: (
      <PublicRoute>
        <GearLevelDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/setting-display-device',
    element: (
      <PublicRoute>
        <SettingDisplayDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/setting-device',
    element: (
      <PublicRoute>
        <SettingGearDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/setting-view-device',
    element: (
      <PublicRoute>
        <SettingViewDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/view-device',
    element: (
      <PublicRoute>
        <ViewDeviceCounte />
      </PublicRoute>
    ),
  },
  {
    path: '/popup-number',
    element: (
      <PublicRoute>
        <PopupNumberPrint />
      </PublicRoute>
    ),
  },
  {
    path: '/view-device-main',
    element: (
      <PublicRoute>
        <ViewDeviceMain />
      </PublicRoute>
    ),
  },
  {
    path: '/draw-number',
    element: (
      <PublicRoute>
        <DrawNumbers />
      </PublicRoute>
    ),
  },
  {
    path: '/login-profile',
    element: (
      <PublicRoute>
        <LoginViewProfile />
      </PublicRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
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
