//import { xamanApi } from '@/api/xamanApi';
import type { AuthResponse } from '../interfaces/auth.response';
import { toast } from 'sonner';
import { LoginResponse } from '../interfaces/data/login.data';


export const loginAction = async ( email: string, password: string ): Promise<AuthResponse> => {
  try {
    const informacion = email + password;
    console.log('loginAction - informacion:', informacion);
    //Consumir el endpoint de login
    /*const { data } = await xamanApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });*/

    const data = LoginResponse;
    
    return data;
  } catch (error) {
    toast.error('Correo o/y contraseña no válidos');
    throw error;
  }
};