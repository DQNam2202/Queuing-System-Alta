import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import { RouteObject } from 'react-router-dom';
//Public Pages
//Admin Pages

import Dashboard from '../pages/CMS/Dashboard';
import Login from '../pages/Home/Login';
import ResetPassword from '../pages/Home/ResetPassword';
import ResetNewPassword from '../pages/Home/ResetNewPassword';
import GearLevelDevice from '../pages/User/GearLevelDevice';
import ViewDeviceCounte from '../pages/User/ViewDeviceCounte';
import ViewDeviceMain from '../pages/User/ViewDeviceMain';
import Page404 from '../components/Page404';

// import FillImformation from '../pages/Interaction/PopupImformation';
import SettingGearDevice from '../pages/User/SettingGearLevelDevice';
import SettingViewDevice from '../pages/User/SettingViewDeviceCounte';
import SettingDisplayDevice from '../pages/User/SettingDisplayDevice';
// Services managers
import ServiceManager from '../pages/CMS/ServiceManager';
import AddService from '../pages/CMS/ServiceManager/AddService';
import UpdateService from '../pages/CMS/ServiceManager/UpdateService';
import DetailService from '../pages/CMS/ServiceManager/DetailService';
//Devices managers

import DeviceManager from '../pages/CMS/DeviceManagement';
import AddDevice from '../pages/CMS/DeviceManagement/AddDevice';
import DetailDevice from '../pages/CMS/DeviceManagement/DetailDevice';
import UpdateDevice from '../pages/CMS/DeviceManagement/UpdateDevice';
//Progression managers
import ProgressManager from '../pages/CMS/ProgressionManager';
import AddProgression from '../pages/CMS/ProgressionManager/AddProgression';
import DetailProgression from '../pages/CMS/ProgressionManager/DetailProgression';
// Profile
import Profile from '../pages/CMS/Profile';
import ReportManager from '../pages/CMS/ReportManagement';
import OleManager from '../pages/CMS/OleManagement';
import AddOle from '../pages/CMS/OleManagement/AddOle';
import UpdateOle from '../pages/CMS/OleManagement/UpdateOle';
import UserManager from '../pages/CMS/UserManagement';
import AddUser from '../pages/CMS/UserManagement/AddUser';
import UpdateUser from '../pages/CMS/UserManagement/UpdateUser';
import UserLog from '../pages/CMS/UserLog';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PublicRoute>
        <h2>Hello world</h2>
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
        <ResetNewPassword />
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
    path: '/settinggear',
    element: (
      <PublicRoute>
        <SettingGearDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/viewsettinggear',
    element: (
      <PublicRoute>
        <SettingViewDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/displaydevice',
    element: (
      <PublicRoute>
        <SettingDisplayDevice />
      </PublicRoute>
    ),
  },
  {
    path: '/devicemain',
    element: (
      <PublicRoute>
        <ViewDeviceMain />
      </PublicRoute>
    ),
  },
  {
    path: '/viewdevice',
    element: (
      <PublicRoute>
        <ViewDeviceCounte />
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
    path: '/dashboard/profile',
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: '/devices-management',
    element: (
      <PrivateRoute>
        <DeviceManager />
      </PrivateRoute>
    ),
  },
  {
    path: '/devices-management/add',
    element: (
      <PrivateRoute>
        <AddDevice />
      </PrivateRoute>
    ),
  },
  {
    path: '/devices-management/detail/:id',
    element: (
      <PrivateRoute>
        <DetailDevice />
      </PrivateRoute>
    ),
  },
  {
    path: '/devices-management/update/:id',
    element: (
      <PrivateRoute>
        <UpdateDevice />
      </PrivateRoute>
    ),
  },
  {
    path: '/services-management',
    element: (
      <PrivateRoute>
        <ServiceManager />
      </PrivateRoute>
    ),
  },
  {
    path: '/services-management/add',
    element: (
      <PrivateRoute>
        <AddService />
      </PrivateRoute>
    ),
  },
  {
    path: '/services-management/update/:id',
    element: (
      <PrivateRoute>
        <UpdateService />
      </PrivateRoute>
    ),
  },
  {
    path: '/services-management/detail/:id',
    element: (
      <PrivateRoute>
        <DetailService />
      </PrivateRoute>
    ),
  },
  {
    path: '/reports-management',
    element: (
      <PrivateRoute>
        <ReportManager />
      </PrivateRoute>
    ),
  },
  {
    path: '/progression-management',
    element: (
      <PrivateRoute>
        <ProgressManager />
      </PrivateRoute>
    ),
  },
  {
    path: '/progression-management/add',
    element: (
      <PrivateRoute>
        <AddProgression />
      </PrivateRoute>
    ),
  },
  {
    path: '/progression-management/detail/:id',
    element: (
      <PrivateRoute>
        <DetailProgression />
      </PrivateRoute>
    ),
  },
  {
    path: '/ole-management',
    element: (
      <PrivateRoute>
        <OleManager />
      </PrivateRoute>
    ),
  },
  {
    path: '/ole-management/add',
    element: (
      <PrivateRoute>
        <AddOle />
      </PrivateRoute>
    ),
  },
  {
    path: '/ole-management/update/:id',
    element: (
      <PrivateRoute>
        <UpdateOle />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-management',
    element: (
      <PrivateRoute>
        <UserManager />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-management/add',
    element: (
      <PrivateRoute>
        <AddUser />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-management/update/:id',
    element: (
      <PrivateRoute>
        <UpdateUser />
      </PrivateRoute>
    ),
  },
  {
    path: '/user-log',
    element: (
      <PrivateRoute>
        <UserLog />
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
