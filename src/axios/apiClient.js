import axios from 'axios';
import Swal from 'sweetalert2';

// Crear una instancia de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8081', // Cambia por tu URL base
});

// Interceptor para agregar automáticamente el token a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtén el token de localStorage, sessionStorage o cookies
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
   
    return Promise.reject(error);

  }
);

export default apiClient;
