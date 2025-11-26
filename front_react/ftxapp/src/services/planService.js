// front_react/ftxapp/src/services/planService.js
import axios from "axios";
import { getToken } from "../auth/token";

// Configurar instancia de axios
const api = axios.create({
  baseURL: "http://localhost:8000/apiFtx",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
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
    console.error("Error en petición:", error);

    if (error.response) {
      // Error del servidor (4xx, 5xx)
      const message = error.response.data?.message || error.response.statusText;
      throw new Error(`Error ${error.response.status}: ${message}`);
    } else if (error.request) {
      // Error de red
      throw new Error(
        "Error de conexión. Verifica que el servidor esté corriendo."
      );
    } else {
      // Error en la configuración
      throw new Error("Error en la petición");
    }
  }
);

export class PlanService {
  // Obtener todos los planes
  static async obtenerTodosLosPlanes() {
    try {
      const response = await api.get("/plan/all");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener plan por ID
  static async obtenerPlanPorId(id) {
    try {
      const response = await api.get(`/plan/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Crear nuevo plan (admin)
  static async crearPlan(planData) {
    try {
      const response = await api.post("/plan/register", planData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar plan (admin)
  static async actualizarPlan(id, planData) {
    console.log("planData en service:", planData);
    try {
      const response = await api.patch(`/plan/update/${id}`, planData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar plan (admin)
  static async eliminarPlan(id) {
    try {
      const response = await api.delete(`/plan/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default PlanService;
