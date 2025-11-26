import { fetchGeneral } from "../../../../components/componentsShare/utils/fetchGeneral.js";

/**
 * Obtiene rutinas de un usuario desde backend.
 *
 * @param {number} idUsuario - ID del usuario
 * @param {Function} showModal - Función para mostrar modal
 * @param {Function} navigate - Función de react-router para redirección
 * @returns {Promise<Array>} - Rutinas del usuario
 */
export async function obtenerRutinasUsuario(endpoint,idUsuario, showModal, navigate) {
  if (!idUsuario) return [];

  const urlEstadistica = endpoint+`${idUsuario}`;
  
  
  let rutinas = [];

  await fetchGeneral({

    url: urlEstadistica,
    // url: `http://localhost:8000/apiFtx/usuario/rutinas/${idUsuario}`,
    method: "GET",
    onSuccess: (data) => {
      if (Array.isArray(data) && data.length === 0) {
        showModal("No tienes rutinas asignadas.\n Contacta a tu trainer para tu rutina personalizada", "info", 4000);
        setTimeout(() => navigate("/usuario"), 2000);
      }
      rutinas = data; // guardamos la respuesta
    },
    showModal,
  });

  return rutinas;
}


/**
 * Obtiene una rutina específica desde backend.
 *
 * @param {number} idRutina - ID de la rutina
 * @param {Function} showModal - Función para mostrar modal
 * @returns {Promise<Object>} - Rutina obtenida del backend
 */
export async function cambiarEstadoRutina(idRutina, estadoRutina, showModal) {
  if (!idRutina) return null;

  let rutina = null;

  

  await fetchGeneral({
    url: `http://localhost:8000/apiFtx/rutina/updateEstado/${idRutina}`,
    method: "PUT",
    body: { estadoRutina: estadoRutina }, 
    
    onSuccess: (data) => {
      rutina = data; // guardamos la respuesta
    },
    showModal,
  });

  return rutina;
}

/**
 * Obtiene una rutina específica desde backend.
 *
 * @param {number} idRutina - ID de la rutina
 * @param {Function} showModal - Función para mostrar modal
 * @returns {Promise<Object>} - Rutina obtenida del backend
 */
export async function obtenerRutina(idRutina, showModal) {
  if (!idRutina) return null;

  let rutina = null;

  await fetchGeneral({
    url: `http://localhost:8000/apiFtx/rutina/${idRutina}`,
    method: "GET",
    onSuccess: (data) => {
      rutina = data; // guardamos la respuesta
    },
    showModal,
  });

  return rutina;
}