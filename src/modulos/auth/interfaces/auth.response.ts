import type { User } from '@/interfaces/user.interface';

//Login, register, checkStatus
export interface AuthResponse {
  message: string;
  success: boolean;
  data: {
    user: User;
    token: string;
};
  code: number;

}