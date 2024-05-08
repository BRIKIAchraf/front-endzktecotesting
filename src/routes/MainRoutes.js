import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));

const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));

const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));

const LeaveManagement = Loadable(lazy(() => import('../views/Conge/LeaveManagement')));

const PlanningManagement = Loadable(lazy(() => import('../views/planning/index')));

//const AttendanceManagement = Loadable(lazy(() => import('../views/attendances/index')));

const DeviceManagement = Loadable(lazy(() => import('../views/devices/index')));

//const LoginMethods = Loadable(lazy(() => import('../views/login/index')));

const DepartmentManagement = Loadable(lazy(() => import('../views/departement/index')));


const LeaveRequestForm = Loadable(lazy(() => import('../views/Conge/LeaveRequestForm')));
// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    },
    { path: '/utils/util-typography', element: <UtilsTypography /> },
    { path: '/sample-page', element: <SamplePage /> },
    { path: '/LeaveManagement', element: <LeaveManagement/> },
    { path: '/PlanningManagement', element: <PlanningManagement/> },
    //{ path: '/AttendanceManagement', element: <AttendanceManagement/> },
    { path: '/DeviceManagement', element: <DeviceManagement/>},
    //{ path: '/login', element: <LoginMethods/>},
    { path: '/DepartmentManagement', element: <DepartmentManagement/>},
    { path: '/LeaveRequestForm', element: <LeaveRequestForm/>},

  ]
};

export default MainRoutes;
