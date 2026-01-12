//import { xamanApi } from '@/api/xamanApi';
import type { AuthResponse } from '../interfaces/auth.response';
import { LoginResponse } from '../interfaces/data/login.data';

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No existe ningún token');

  try {
    //
    //const { data } = await xamanApi.get<AuthResponse>('/auth/check-status');
    const data = LoginResponse;

    localStorage.setItem('token', data.data.token);

    return data;
  } catch (error) {
    console.log('El token dio una respuesta token fallido' + error);
    localStorage.removeItem('token');
    throw new Error('El token ha expirado');
  }
};