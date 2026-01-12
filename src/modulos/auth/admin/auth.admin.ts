import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
    //Properties
    user: User | null,
    token: string | null,
    authStatus: AuthStatus,
    

    //Getters
    isAdmin: () => boolean,
    //Actions 
    login: (email:string, password:string)=> Promise<boolean>,
    logout : ()=>void,
    checkAuthStatus: () => Promise<boolean>,
}

export const useAuth = create<AuthState>()((set,get) => ({
   // Implementación del admin
  user: null,
  token: null,
  authStatus: 'checking',

  // Getters
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes('admin');
    // return !!get().user?.roles.includes('admin')
  },

  // Actions
  login: async (email: string, password: string) => {
    

    try {
      const data = await loginAction(email, password);
      localStorage.setItem('token', data.data.token);
      
      set({ user: data.data.user, token: data.data.token, authStatus: 'authenticated' });

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('Error de logeo:    ' + error);
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, authStatus: 'not-authenticated' });
  },

  checkAuthStatus: async () => {
    try {
      const { data } = await checkAuthAction();
      set({
        user: data.user,
        token: data.token,
        authStatus: 'authenticated',
      });
      
      
      return true;
    } catch (error) {
      console.log('No se pudo validar el token ' + error);
      set({
        user: undefined,
        token: undefined,
        authStatus: 'not-authenticated',
      });

      return false;
    }
  },
}));