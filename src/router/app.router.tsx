import { createBrowserRouter, Navigate } from 'react-router';
//import { InternoLayout } from '@/modulos/layouts/components/custom/InternoLayout';
import { EmpadronamientoPage } from '@/modulos/padron/empadronamiento/pages/EmpadronamientoPage';
import { LoginPage } from '@/modulos/auth/pages/login/LoginPage';
import { lazy } from 'react';
import { AuthLayout } from '@/modulos/auth/layout/AuthLayout';

//Importación perezosa de las páginas y layouts

const InternoLayout = lazy(() => import ('@/modulos/layouts/InternoLayout'));

export const appRouter = createBrowserRouter([    
  // Rutas generales
  {
    path: '/',
    element: <InternoLayout/>,
    children: [
       {
         index: true,
         element:  <EmpadronamientoPage derechohabienteForm={ undefined } />,
       },
      
     ],
  },
  //Auth Routes
  {
    path: '/acceso',
    element: <AuthLayout/>,
    children: [
      {
         index: true,
         element:  <Navigate to="/acceso/login" />,
       },
       {
         path: 'login',
         element:  < LoginPage />,
       },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);