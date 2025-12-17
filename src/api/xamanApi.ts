import axios from 'axios';

const xamanApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// xamanApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   console.log(import.meta.env.VITE_API_URL );
//   return config;
// });

export { xamanApi };