import { useAuth } from '@/modulos/auth/admin/auth.admin';
import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';


//Para envolver rutas que requieren autenticación o roles específicos
export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuth();
    if (authStatus === 'checking') return null;
    if (authStatus === 'not-authenticated') return <Navigate to="/acceso/login" />;

  return children;
};
//Rutas accesibles solo para usuarios no autenticados
export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuth();
  if (authStatus === 'authenticated') return <Navigate to="/admin" />;
  return children;
};

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const { authStatus, } = useAuth();
  console.log('AdminRoute - authStatus:', authStatus);

  //if (authStatus === 'checking') return null;//Podemos corregir esto

  if (authStatus === 'not-authenticated') return <Navigate to="/acceso/login" />;

  <Navigate to="/admin" />;

  return children;
};