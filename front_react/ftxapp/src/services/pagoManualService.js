// front_react/ftxapp/src/services/pagosService.js
import axios from 'axios';
import { getToken } from "../auth/token";
import API_URL from "../config/api";

// Configurar instancia de axios
const api = axios.create({
  baseURL: '${API_URL}',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para incluir token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // config.headers.Authorization = `ftx_token ${token}`;
      config.headers['ftx_token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en petición:', error);
    
    if (error.response) {
      // Error del servidor (4xx, 5xx)
      const message = error.response.data?.message || error.response.statusText;
      throw new Error(`Error ${error.response.status}: ${message}`);
    } else if (error.request) {
      // Error de red
      throw new Error('Error de conexión. Verifica que el servidor esté corriendo.');
    } else {
      // Error en la configuración
      throw new Error('Error en la petición');
    }
  }
);

export class PagosService {
  // Registrar pago manual
  static async registrarPagoManual(pagoData) {

    // console.log("entro a pagosService", pagoData);
    try {
      const response = await api.post('/pagos/manual', pagoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener pagos por usuario
  static async obtenerPagosPorUsuario(usuarioId) {
    try {
      const response = await api.get(`/pagos/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener todos los pagos (para admin)
  static async obtenerTodosLosPagos() {
    try {
      const response = await api.get('/pagos');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default PagosService;