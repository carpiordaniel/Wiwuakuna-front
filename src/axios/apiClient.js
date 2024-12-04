import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_BASE } from '../globals/constantes';

// Crear una instancia de Axios
const axiosClient = axios.create({
  baseURL: URL_BASE, // Cambia por tu URL base
});

// Interceptor para agregar automáticamente el token a cada solicitud
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Config:', config);
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
