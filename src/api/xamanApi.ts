import axios from 'axios';

const xamanApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 120000,
});

//Todo:Activar este código cuando se implement el JWT
// Middleware para agregar el token en cada petición
// xamanApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');//obtener el token del almacenamiento local
//   if (token) {//Si tenemos el tolken lo agregamos a la petición
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   console.log(import.meta.env.VITE_API_URL );
//   return config;
// });

export { xamanApi };