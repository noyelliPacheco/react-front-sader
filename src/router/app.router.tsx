import { createBrowserRouter, Navigate } from 'react-router';
//import { InternoLayout } from '@/modulos/layouts/components/custom/InternoLayout';
import { EmpadronamientoPage } from '@/modulos/padron/empadronamiento/pages/EmpadronamientoPage';
import { LoginPage } from '@/modulos/auth/pages/login/LoginPage';
import { lazy } from 'react';
//import { AuthLayout } from '@/modulos/auth/layout/AuthLayout';
import HomePage from '@/modulos/home/pages/HomePage';
import { AdminRoute, NotAuthenticatedRoute } from '@/components/routes/ProtectedRoutes';
import { EliminarPage } from '@/modulos/padron/empadronamiento/pages/EliminarPage';

//Importación perezosa de las páginas y layouts

const InternoLayout = lazy(() => import ('@/modulos/layouts/InternoLayout'));
const AuthLayout = lazy(() => import ('@/modulos/auth/layout/AuthLayout'));

export const appRouter = createBrowserRouter([   
  
  // Rutas publicas
  //Todo:Falta realizar la página del HomePage público
  // {
  //   path: '/',
  //   element: <InternoLayout/>,
  //   children: [
  //      {
  //        index: true,
  //        element:  <HomePage />,
  //      },
      
  //    ],
  // },

  //Auth Routes
  {
    path: '/acceso',
    element: (<NotAuthenticatedRoute>
                <AuthLayout />
              </NotAuthenticatedRoute>),
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

  // Rutas de administrador interno
  {
    path: '/admin',
    element:  ( <AdminRoute>
                  <InternoLayout/>
                </AdminRoute>
              ),
    children: [
       {
         index: true,
         element:  <HomePage />,
       },
       {
        path: 'empadronamiento/agregarActualizar',
        element:  <EmpadronamientoPage derechohabienteForm={ undefined } />,
       },
       {
        path: 'empadronamiento/eliminar',
        element:  <EliminarPage  />,
       },
     ],
  },
  
  {
    path: '*',
    element: <Navigate to="/acceso/login" />,
  },
]);